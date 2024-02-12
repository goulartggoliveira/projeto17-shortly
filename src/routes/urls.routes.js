import { Router } from "express";
import { deleteUrl, getUrl, openUrl, shortenUrl } from "../controllers/url.controllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { urlSchema } from "../schema/url.schemas.js";
import { validateAuth } from "../middlewares/validateauth.js";

const urlRouter = Router()


urlRouter.post("/urls/shorten",validateSchema(urlSchema),validateAuth, shortenUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id",validateAuth, deleteUrl)

export default urlRouter