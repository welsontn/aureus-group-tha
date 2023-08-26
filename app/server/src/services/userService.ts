import { MongoClient, Db, ObjectId, Filter, UpdateResult } from "mongodb";
import { UserEntity, userEntitySchema } from "#src/schemas/userEntity"
import { UserDTO, UserDTOWithPassword } from "#src/schemas/userDTO";
import dbClient from "#src/services/dbClient";
import passwordUtil from "#src/utils/passwordUtil";
import ErrorResponse from "#src/utils/errorResponse";
import { roleEnum } from "#src/enums/roleEnum";
import jobService from "./jobService";
import { JobDTO } from "#src/schemas/jobDTO";

class UserService {
  private readonly db: Db;

  constructor(mongoClient: MongoClient) {
    this.db = mongoClient.db();
    // create index on startup 
    const collection = this.getUsersCollection()
    collection.createIndex({ "email": 1}, {unique: true, background: true})
  }

  private getUsersCollection() {
    return this.db.collection<UserEntity>("users");
  }

  async getById(id: string): Promise<UserDTO | null> {
    const entity = await this.getUsersCollection().findOne({ _id: new ObjectId(id) });
    return entity ? UserDTO.convertFromEntity(entity) : null;
  }

  /**
   * Get user by email
   * @param email 
   * @returns return UserDTO, or null if invalid
   */
  async getByEmail(email: string): Promise<UserDTO | null> {
    const entity = await this.getUsersCollection()
                             .findOne({ email: email });

    // found user by email
    return entity ? UserDTO.convertFromEntity(entity) : null;
  }

  /**
   * Get user by email and role, with password optionally
   * @param role 
   * @param email 
   * @param password 
   * @returns return UserDTO, or null if invalid
   */
  async getByEmailAndRole(email: string, role: string, withPassword: boolean = false): Promise<UserDTO | UserDTOWithPassword | null> {
    const entity = await this.getUsersCollection()
                             .findOne({ email: email, role: roleEnum.parse(role) });

    if (entity) {
      if (withPassword){
        return UserDTOWithPassword.convertFromEntity({...entity});
      } else {
        return UserDTO.convertFromEntity({...entity});
      }
    }
    return null
  }

  /**
   * Add job ID to appliedJobs by Slug
   * @param role 
   * @param email 
   * @param password 
   * @returns return UserDTO, or null if invalid
   */
  async applyJobBySlug(user_id: string, slug: string): Promise<UpdateResult> {
    
    // check if job exist and active
    const job = await jobService.getBySlug(slug)

    let result
    if (job && job.active && job.id){
      // user apply job
      result = await userService.applyJob(user_id, job.id)
      if (result.modifiedCount == 0){
        throw new ErrorResponse(400, "Job already applied")
      }
    } else {
      throw new ErrorResponse(400, "Job not found")
    }
    
    return result
  }

  /**
   * Add job ID to appliedJobs
   * @param role 
   * @param email 
   * @param password 
   * @returns return UserDTO, or null if invalid
   */
  async applyJob(user_id: string, job_id: string): Promise<UpdateResult> {
    const result = await this.getUsersCollection()
                             .updateOne(
                                { 
                                  _id: new ObjectId(user_id),
                                  appliedJobIds: { $nin: [job_id] }, // only if job not inside yet
                                },
                                { $push: { appliedJobIds: job_id }}
                              )
    return result
  }

  /**
   * Get applied jobs in Full Object forms
   * @param user_id 
   * @returns return UserDTO, or null if invalid
   */
  async getAppliedJobs(user_id: string): Promise<Array<JobDTO>> {
    const userResult = await this.getUsersCollection()
                                    .findOne(
                                      { _id: new ObjectId(user_id)},
                                      { projection: 
                                        { appliedJobIds: 1, _id: 0 }
                                      }
                                    )
    // if user found
    if (userResult){
      const ids = userResult.appliedJobIds
      const dtos = await jobService.getByIds(ids)
      return dtos
    }

    throw new ErrorResponse(404, "User not found")
  }


  /**
   * Pull appliedJobId from Many users
   * @param user_id 
   * @returns return UserDTO, or null if invalid
   */
  async pullAppliedJobIdFromMany(job_id: string): Promise<UpdateResult> {
    const result = await this.getUsersCollection()
                              .updateMany(
                                { appliedJobIds: job_id },
                                { 
                                  $pull: {appliedJobIds: job_id}
                                }
                              )
    return result
  }

  /**
   * Create user
   * @param UserDTO
   * @returns UserDTO with id
   */
  async createUser(dto: Omit<UserDTO, "id">): Promise<UserDTO> {
    // validate
    const user = userEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
    });

    // hash password
    const hashedPassword:string = await passwordUtil.hash(user.password);

    // check if email already exist
    const userResult = await this.getUsersCollection()
                                 .countDocuments(
                                  { email: user.email },
                                  { limit: 1}
                                );
    if (userResult > 0){
      throw new ErrorResponse(409, "Email already exist!");
    }
    
    // add to DB
    const { insertedId } = await this.getUsersCollection()
                                     .insertOne(
                                        {...user, password: hashedPassword}
                                    );
    
    // Return DTO with id
    return UserDTO.convertFromEntity({ ...dto, _id: insertedId });
  }
}

const userService = new UserService(dbClient) 
export default userService