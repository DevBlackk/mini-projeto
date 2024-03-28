import express from "express";
import upload from "./middlewares/multer.js";
import { userRoutes } from "./routes/user.route.js";
import { postRoutes } from "./routes/post.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
