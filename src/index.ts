import express from "express"
import cors from "cors"
import morgan from 'morgan'
import { connect } from "./db/connect.js";
import { authRouter } from "./routes/users.js";
import { notFound } from "./middleware/notFound.js";
import { login } from "./controllers/user-controller.js";

const app = express()

connect().catch((e) => {
    console.log(e);
});

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get('/home', (req, res) => {
    res.json({ message: "Home Page" });
});

app.get("/api/login", login);
app.use(notFound);

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

