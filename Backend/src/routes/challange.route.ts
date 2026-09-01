import { Router } from "express";;
import { protect } from "../middleware/auth.middleware.js";
import { createChallangeController,getChallengesController,getSpecficChallenge,removeChallenge } from "../controller/challange.controller.js";

const router = Router();

router.post("/",protect,createChallangeController);
router.get("/",protect,getChallengesController);

router.get("/:id",getSpecficChallenge);
router.delete("/:id",protect,removeChallenge);

export default router;

