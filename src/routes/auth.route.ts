import { Router } from "express";
import { signIn, signUp, Profile } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth/verifyToken.middleware";
const router: Router = Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/profile", validateToken, Profile)

export default router;