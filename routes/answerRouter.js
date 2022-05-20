import { Router } from "express";

import {
  postAnswer,
  getAnswer,
} from "../controllers/answerController.js";

const answerRouter = Router();

answerRouter.post("/answer/:idQuestion", postAnswer);
answerRouter.get("/answer/:idQuestion", getAnswer);

export default answerRouter;