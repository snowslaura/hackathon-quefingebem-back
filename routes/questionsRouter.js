import { Router } from "express";

import {
  postQuestions,
  getQuestions,
} from "../controllers/questionsController.js";

const questionsRouter = Router();

questionsRouter.post("/questions", postQuestions);
questionsRouter.get("/questions", getQuestions);

export default questionsRouter;