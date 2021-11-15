import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        msg: ['Credenciais inválidas.'],
      });
    }

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({
          msg: ['Usuário não existe.'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          msg: ['Senha inválida.'],
        });
      }
      const { id } = user;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.status(200).json({ token });
    } catch (e) {
      console.log(e);
      return res.status(401).json(null);
    }
  }
}

export default new TokenController();
