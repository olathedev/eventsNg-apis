import express from "express";
import { auth } from "../middlewares/auth.js";
import { createNewMerch, getAllMerch } from "../controllers/merch-controller.js";

const router = express.Router()


router.use(auth)

router.route('/:id').get(getAllMerch).post(createNewMerch)

export default router