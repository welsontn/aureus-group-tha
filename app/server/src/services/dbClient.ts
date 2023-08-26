import { Db, MongoClient, ServerApiVersion } from "mongodb";
import * as mongoConfig from "#src/configs/mongo.config";

const uri = mongoConfig.MONGO_CONN_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbClient = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

export = dbClient;