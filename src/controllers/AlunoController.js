import Aluno from '../models/Aluno';

class AlunoController {
  /** Store */
  async store(req, res) {

  }

  /** Index */
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();
      return res.status(200).json(alunos);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  /** Show */
  async show(req, res) {

  }

  /** Update */
  async update(req, res) {

  }

  /** Delete */
  async delete(req, res) {}
}

export default new AlunoController();
