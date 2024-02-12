import { Router } from "express";
import { getCurrentUser, getUserRanking } from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.get("/users/me", getCurrentUser)
userRouter.get("/ranking", getUserRanking)

export default userRouter