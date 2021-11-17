import multer from 'multer';

import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('foto');

import Foto from '../models/Foto';

class FotoController {
  /** Store */
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      const {
        originalname,
        filename,
      } = req.file;

      const { aluno_id } = req.body;
      console.log(aluno_id);
      const foto = await Foto.create({
        originalname,
        filename,
        aluno_id,
      });

      return res.json(foto);
    });
  }
}

export default new FotoController();
