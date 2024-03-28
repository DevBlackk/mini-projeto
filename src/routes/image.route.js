import { Router } from "express";
import upload from '../middlewares/multer.js'
import { CreateImageController } from "../useCases/createImage/CreateImageController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const imageRoutes = Router();

const image = new CreateImageController();

imageRoutes.post("/image/:postId", upload, ensureAuthenticated, image.handle);

export { imageRoutes };
