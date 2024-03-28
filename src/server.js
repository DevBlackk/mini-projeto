import express from "express";
import upload from "./middlewares/multer.js";
import { CreateImageController } from "./useCases/createImage/createImageController.js";

const app = express();
const PORT = process.env.PORT || 3000;
const createImageController = new CreateImageController() 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", upload, createImageController.handel);
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
