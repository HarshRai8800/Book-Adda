import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploaddir = path.join(__dirname, "../public/multer");
        if (!fs.existsSync(uploaddir)) {
            fs.mkdirSync(uploaddir, { recursive: true });
        }
        cb(null, uploaddir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage
});
