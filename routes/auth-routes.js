import express from "express"
import { accountVerification, signin, signup, userProfile } from "../controllers/auth-controller.js"
import { auth } from "../middlewares/auth.js"

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/verify', accountVerification)
router.get('/profile',auth, userProfile)

export default router