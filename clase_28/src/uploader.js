import multer from 'multer'
import { __dirname} from './utils.js'
import config from './config.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/${config.UPLOAD_DIR}`)
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage })