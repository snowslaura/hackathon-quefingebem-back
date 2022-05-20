import db from "./../src/app/db.js"
import joi from "joi";

export async function postTopics(req,res){
    const {title} = req.body
    const topicSchema = joi.object({
        title: joi.string().required()
    })

    const {error} = topicSchema.validate(req.body, {abortEarly: false})

    if(error){
        return res.sendStatus(422).send(error.details.map((detail) => detail.message))
    }   

    try {
        let topic = await db.collection("topics").insertOne({
            title
        })
        console.log(topic)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }
}

export async function getTopics(req,res){
    try{
        const topics = await db.collection("topics").find({}).toArray();
        topics.reverse()
        res.send(topics);
    }catch(err){
        console.log("Deu erro no envio dos tópicos", err);
        res.sendStatus(500);
    }
}