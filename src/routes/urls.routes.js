import { Router } from "express";
import { deleteUrl, getUrl, openUrl, shortenUrl } from "../controllers/url.controllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { urlSchema } from "../schema/url.schemas.js";

const urlRouter = Router()


urlRouter.post("/url/shorten",validateSchema(urlSchema), shortenUrl)
urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", deleteUrl)

export default urlRouter