import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
console.log(process.env.DATAB)

const app = express();
app.use(express.json());

app.use(cors());

app.get("/ping", (req, res) => {
	res.send("pong");
});

export default app;