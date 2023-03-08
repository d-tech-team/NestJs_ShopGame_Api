import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';


// Multer configuration
export const multerConfig = {
    dest: './uploads',
};

// Multer upload options
export const multerOptions = {
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // fileFilter: (req: any, file: any, cb: any) => {
    //     if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    //         cb(null, true);
    //     } else {
    //         cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    //     }
    // },
    // storage: diskStorage({
    //     destination: (req: any, file: any, cb: any) => {
    //         const uploadPath = multerConfig.dest;
    //         if (!existsSync(uploadPath)) {
    //             mkdirSync(uploadPath);
    //         }
    //         cb(null, uploadPath);
    //     },
    //     filename: (req: any, file: any, cb: any) => {
    //         cb(null, `${uuid()}${extname(file.originalname)}`);
    //     },
    // }),
    storage: diskStorage({
        destination: './uploads'
        , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
};