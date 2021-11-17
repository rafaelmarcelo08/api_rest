import multer from 'multer';
import {
  extname, // pegar extensao de um arquivo
  resolve,
} from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 1000);

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // 1 erro/ 2 - caminho
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      // 1 erro/ 2 - caminho
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
