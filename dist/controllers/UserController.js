"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  /** Store */
  async store(req, res) {
    const {
      body,
    } = req;

    try {
      const novoUser = await _User2.default.create(body);
      const { id, nome, email } = novoUser;
      return res.json(
        { id, nome, email },
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
      const users = await _User2.default.findAll({
        attributes: ['id', 'nome', 'email'],
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  /** Show */
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId, {
        attributes: ['id', 'nome', 'email'],
      });
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
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      console.log('error: ', e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }

  /** Delete */
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }
      await user.destroy();
      return res.json(null);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        erros: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
