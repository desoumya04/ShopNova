import multer from "multer"
import fs from "fs"
import os from "os"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(os.tmpdir(), 'shoping-uploads')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })