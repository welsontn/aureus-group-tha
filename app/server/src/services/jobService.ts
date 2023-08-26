import { MongoClient, Db, ObjectId, Filter, DeleteResult, ModifyResult, Document } from "mongodb";
import { JobEntity, jobEntitySchema } from "#src/schemas/jobEntity"
import { JobDTO, jobDTOSchema } from "#src/schemas/jobDTO";
import dbClient from "#src/services/dbClient";
import ErrorResponse from "#src/utils/errorResponse";
import utils from "#src/utils/utils";
import userService from "./userService";
import { unlink } from "fs/promises";
import { logger } from "./logger";

class JobService {
  private readonly db: Db;

  constructor(mongoClient: MongoClient) {
    this.db = mongoClient.db();
    // create index on startup 
    const collection = this.getJobsCollection()
    collection.createIndex({ "slug": 1}, {unique: true, background: true})
  }

  private getJobsCollection() {
    return this.db.collection<JobEntity>("jobs");
  }

  /**
   * Get all jobs
   * @param projection 
   * @returns array of jobs
   */
  async getAll(projection: Record<string, number> = {}): Promise<Array<JobDTO>> {
    const entities = await this.getJobsCollection()
                               .find({}, {projection: projection})
                               .toArray();
    const dtos = entities.map(x => JobDTO.convertFromEntity(x))
    return dtos;
  }

  /**
   * Get all active jobs only
   * @param projection 
   * @returns array of active jobs
   */
  async getAllActive(projection: Record<string, number> = {}): Promise<Array<JobDTO>> {
    const entities = await this.getJobsCollection()
                               .find({active: true}, {projection: projection})
                               .toArray();
    const dtos = entities.map(x => JobDTO.convertFromEntity(x))
    return dtos;
  }

  async getById(id: string): Promise<JobDTO | null> {
    const entity = await this.getJobsCollection().findOne({ _id: new ObjectId(id) });
    return entity ? JobDTO.convertFromEntity(entity) : null;
  }

  /**
   * Get a list of jobs by ids
   * @param job ids 
   * @returns List of Job DTOs
   */
  async getByIds(ids: Array<string>): Promise<Array<JobDTO>> {
    const entities = await this.getJobsCollection()
                              .find(
                                { _id: 
                                  {
                                    $in: ids.map(x => new ObjectId(x)),
                                  }
                                },
                                {
                                  projection: { description: 0 }
                                })
                              .toArray()
    return entities.map(x => JobDTO.convertFromEntity(x));
  }

  async getBySlug(slug: string): Promise<JobDTO | null> {
    const entity = await this.getJobsCollection().findOne({ slug: slug });
    return entity ? JobDTO.convertFromEntity(entity) : null;
  }

  /**
   * Delete Job
   * @param id 
   * @returns return deleted jobDTO, or null if no job is deleted
   */
  async deleteById(id: string ): Promise<JobDTO | null> {
    const result = await this.getJobsCollection()
                             .findOneAndDelete({ _id: new ObjectId(id) });
    
    if (result.value){
      // remove job id from users' applied job
      await userService.pullAppliedJobIdFromMany(id);

      // Delete image
      if (result.value.imagePath){
        try {
          await unlink(result.value.imagePath)
        } catch (e) {
          // file not found, just log it
          logger.warn("Attempted deleting image file and failed: " + result.value.imagePath)
        }
      }
    } else {
      // not found
      return null
    }

    // convert to DTO
    const dto = jobDTOSchema.parse({...result.value})
    return dto
  }

  /**
   * Get Job by slug
   * @param slug 
   * @returns return JobDTO, or null if invalid
   */
  async getByEmail(slug: string): Promise<JobDTO | null> {
    const entity = await this.getJobsCollection()
                             .findOne({ slug: slug });

    // found Job by email
    return entity ? JobDTO.convertFromEntity(entity) : null;
  }

  /**
   * Create Job
   * @param JobDTO
   * @returns JobDTO with id
   */
  async createJob(dto: Omit<JobDTO, "id">): Promise<JobDTO> {
    // validate
    const job = jobEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
      slug: utils.slugify(dto.title),
    });

    // edge case incase generated slug collide
    const queryResult = await this.getJobsCollection()
                                 .countDocuments(
                                  { slug: job.slug },
                                  { limit: 1}
                                );
    if (queryResult > 0){
      throw new ErrorResponse(409, "Slug already exists.");
    }
    
    // add to DB
    const { insertedId } = await this.getJobsCollection()
                                     .insertOne(
                                        {...job}
                                    );
    
    // Return DTO with id
    return JobDTO.convertFromEntity({ ...job, _id: insertedId });
  }
}

const jobService = new JobService(dbClient) 
export default jobService