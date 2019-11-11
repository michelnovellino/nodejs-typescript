import { Router } from "express";
import { Request, Response } from "express";
import { signIn, signUp, Profile, google } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth/verifyToken.middleware";
const router: Router = Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/", (req: Request, res: Response) => {

    const data = JSON.stringify(req.body)
    const params = JSON.stringify(req.params)
    console.log("oauth google >>>> ", data)
    res.status(201).json({
        data: data,
        params: params
    })
})
router.get("/profile", validateToken, Profile)
router.get("/google", google)

export default router;