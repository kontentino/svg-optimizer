import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/svg+xml') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})
