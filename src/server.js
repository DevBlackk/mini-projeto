import express from 'express';
import { uploadImage } from './config/cloudinary/cloudinary.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/', uploadImage)
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
