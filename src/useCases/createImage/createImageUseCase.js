import cloudinary from "../../config/cloudinary/cloudinary.js";

class CreateImageUseCase {
    async cloudinaryUploader(request, response) {
        const file = request.file;

        if (!file) {
            return response.status(400).json({
                message: "File not found",
            });
        }

        const fName = file.orinalname.split(".")[0];

        try {
            const uploadImage = await cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                folder: "posts",
                public_id: `post/${fName}`,
                overwrite: true,
                tags: "posts",
            });

            return uploadImage;
        } catch (error) {
            console.log(error);
            return response.status(400).json({ message: error.message });
        }
    }
}

export { CreateImageUseCase };
