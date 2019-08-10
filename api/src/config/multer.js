import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads', 'files'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, resBuffer) => {
        if (err) return cb(err);

        return cb(null, resBuffer.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
