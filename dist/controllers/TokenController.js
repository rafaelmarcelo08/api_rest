"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

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
      const user = await _User2.default.findOne({
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
      const {
        id,
      } = user;

      const token = _jsonwebtoken2.default.sign({
        id,
        email,
      }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.status(200).json({
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json(null);
    }
  }
}

exports. default = new TokenController();
