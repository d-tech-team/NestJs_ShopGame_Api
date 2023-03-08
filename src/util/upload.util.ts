import { removeSingleFile } from "./removeFile";

const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env

const folder = 'thumbnail'

cloudinary.config({
    cloud_name: "dmttnqu9d",
    api_key: "621627864841333",
    api_secret: "eMrKqVxumWYQOdI1-JtmdNaiMCs"
})

const uploadSingle = (file: string): Promise<any> => {
    return new Promise(async res => {
        try {
            const response = await cloudinary.uploader.upload(file, {
                folder
            })
            removeSingleFile(file)
            const { secure_url, public_id } = response

            return res({
                secure_url,
                public_id
            })

        } catch (error) {
            console.log(error);
        }
    })
}

const uploadMultiFile = (files: Array<any>): Promise<any> => {
    return new Promise(async res => {
        try {
            const data = await Promise.all(files.map(async file => {
                const response = await cloudinary.uploader.upload(file.path, {
                    folder
                })
                removeSingleFile(file.path)
                const { secure_url, public_id } = response
                return {
                    secure_url,
                    public_id
                }
            }))
            return res(data)
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteSingleFile = (file: string) => {
    try {
        cloudinary.uploader.destroy(file)
    } catch (error) {
        console.log(error);
    }
}

export {
    uploadSingle,
    uploadMultiFile,
    deleteSingleFile
}