import express from "express"
import { accountVerification, signin, signup } from "../controllers/auth-controller.js"

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/verify', accountVerification)

export default router