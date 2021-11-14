import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Maria',
        sobrenome: 'Miranda',
        email: 'maria@gmail.com',
        idade: 23,
        peso: 65,
        altura: 1.7,
      });

      res.json(
        novoAluno,
      );
    } catch (e) {
      console.log('ERROR: ', e);
    }
  }
}

export default new HomeController();
