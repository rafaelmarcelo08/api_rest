import User from '../models/User';

class UserController {
  /** Store */
  async store(req, res) {
    const {
      body,
    } = req;

    try {
      const novoUser = await User.create(body);

      return res.json(
        novoUser,
      );
    } catch (e) {
      console.log('error: ', e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }

  /** Index */
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  /** Show */
  async show(req, res) {
    try {
      const id = Number(req.params.id);

      if (typeof id !== 'number' || Number.isNaN(id)) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }

  /** Update */
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novoDados = await user.update(req.body);

      return res.json(novoDados);
    } catch (e) {
      console.log('error: ', e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }

  /** Delete */
  async delete(req, res) {
    const id = Number(req.params.id);
    console.log(typeof id);
    console.log(id);
    if (typeof id !== 'number' || Number.isNaN(id)) {
      return res.status(400).json({
        errors: ['ID não enviado.'],
      });
    }
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }
      await user.destroy();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
