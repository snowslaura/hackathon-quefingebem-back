import express, {json} from "express";
import cors from "cors"
import dotenv from "dotenv"

import questionsRouter from "../../routes/questionsRouter.js";
import topicsRouter from "../../routes/topicsRouter.js";
import answerRouter from "../../routes/answerRouter.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(questionsRouter);
app.use(topicsRouter)
app.use(answerRouter)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
console.log(`Server is running on port http://localhost:${PORT}`)
})
