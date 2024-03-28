import { Router } from "express";
import { CreateUserController } from "../useCases//createPost/CreatePostController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const postRoutes = Router();

const post = new CreateUserController();

postRoutes.post("/post", post.handle);

export { postRoutes };
