import { Router } from "express";
import { CreatePostController } from "../useCases//createPost/CreatePostController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const postRoutes = Router();

const post = new CreatePostController();

postRoutes.post("/post", post.handle);

export { postRoutes };
