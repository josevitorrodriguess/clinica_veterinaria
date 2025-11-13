import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.use(routes);

export default app;