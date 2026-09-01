import { Router } from "express";;
import { protect } from "../middleware/auth.middleware.js";
import { createChallangeController,getChallengesController } from "../controller/challange.controller.js";

const router = Router();

router.post("/",protect,createChallangeController);

export default router;

