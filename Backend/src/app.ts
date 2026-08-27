import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import { protect } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);

app.get("/api/test",protect,(req, res) => {
    res.json({
        message: "Test Route successfully ran :-)"
    })
});

export default app;