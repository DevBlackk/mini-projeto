import { Router } from "express";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const userRoutes = Router();

const user = new CreateUserController();

userRoutes.post("/register", user.handle);

export { userRoutes };
