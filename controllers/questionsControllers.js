import dayjs from "dayjs";

import db from "./../src/app/db.js";
import { ObjectId } from "mongodb";
import joi from "joi";

export async function postQuestions(req, res) {
  const { title, type } = req.body;
  let now = dayjs();

  const questionSchema = joi.object({
    title: joi.string().required(),
    type: joi.string().required(),
  });

  const { error } = questionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
    return;
  }

  try {
    await db.collection("questions").insertOne({
      title,
      type,
      date: now.format("YYYY-MM-DD HH:mm:ss"),
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(422);
  }
}

export async function getQuestions(req, res) {
  try {
    const questions = await db
      .collection("questions")
      .find({})
      .toArray();
    res.send(questions);
  } catch (err) {
    console.log("Deu xabu no envio da pergunta!", err);
    res.sendStatus(500);
  }
}
