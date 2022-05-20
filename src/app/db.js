import dotenv from "dotenv"
import {MongoClient} from "mongodb"
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db = null

try{
    await mongoClient.connect()
    db = mongoClient.db(process.env.BASE_MONGO)
}catch(e){
    console.log(e)
}

export default db;