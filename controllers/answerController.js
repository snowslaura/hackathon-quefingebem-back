import db from "../src/app/db.js";
import joi from "joi";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function postAnswer(req, res) {
  const { answer } = req.body;
  const id = req.params.idQuestion;
  let now = dayjs();

  const answerSchema = joi.object({
    answer: joi.string().required(),
  });
  const { error } = answerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    return res.sendStatus(422);
  }
  try {
    const questionExists = await db
      .collection("questions")
      .findOne({ _id: new ObjectId(id) });
    console.log(questionExists);
    if (!questionExists) {
      return res.sendStatus(404);
    }

    let answerASAS = await db
      .collection("answers")
      .insertOne({
        answer: answer,
        idQuestion: questionExists._id,
        date: now.format("YYYY-MM-DD HH:mm:ss"),
      });
    console.log(answerASAS);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao postar a sua resposta");
  }
}

export async function getAnswer(req, res) {
  const { idQuestion } = req.params;
  console.log(idQuestion);
  const idExists = await db
    .collection("questions")
    .findOne({ _id: new ObjectId(idQuestion) });
  console.log(idExists);
  if (!idExists) {
    res.sendStatus(404);
  }
  try {
    const answers = await db
      .collection("answers")
      .find({ idQuestion: new ObjectId(idQuestion) })
      .toArray();
    console.log(answers);
    res.send(answers);
  } catch (err) {
    console.log("Deu erro no envio das respostas!", err);
    res.sendStatus(500);
  }
}
