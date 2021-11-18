import multer from 'multer';
import {
  extname, // pegar extensao de um arquivo
  resolve,
} from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 1000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      console.log(file.mimetype);
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // 1 erro/ 2 - caminho
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      // 1 erro/ 2 - caminho
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
