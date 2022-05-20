import { Router } from "express";
import {
    getTopics, 
    postTopics,
} from "../controllers/topicsController.js";

const topicsRouter = Router();

topicsRouter.post("/topics", postTopics);
topicsRouter.get("/topics", getTopics);

export default topicsRouter;