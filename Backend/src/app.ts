import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import { protect } from "./middleware/auth.middleware.js";
import challengeRoute from "./routes/challange.route.js";
import participationRoute from "./routes/participation.route.js";
import submissionRoutes from "./routes/submission.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/challenges",challengeRoute);
app.use("/part",participationRoute);
app.use("/", submissionRoutes);

app.get("/api/test",protect,(req, res) => {
    res.json({
        message: "Test Route successfully ran :-)"
    })
});

export default app;