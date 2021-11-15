import User from '../models/User';

class UserController {
  async store(req, res) {
    const { body } = req;

    try {
      const novoUser = await User.create(body);

      res.json(
        novoUser,
      );
    } catch (e) {
      console.log('error: ', e);
      res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
