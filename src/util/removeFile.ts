import { unlinkSync } from "fs"


const removeSingleFile = (file: string) => {
    try {
        unlinkSync(file)
    } catch (error) {
        console.log(error);
    }
}

export {
    removeSingleFile
}