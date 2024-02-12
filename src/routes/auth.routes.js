import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { userSchema } from "../schema/user.schemas.js";
import { authSchema } from "../schema/auth.schemas.js";

const authRouter = Router()

authRouter.post("/signup",validateSchema(userSchema), signUp)
authRouter.post("/signin",validateSchema(authSchema), signIn)

export default authRouter