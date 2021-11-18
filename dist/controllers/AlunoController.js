"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  /** Store */
  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não foi criado.'],
        });
      }

      return res.status(200).json({
        aluno,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  /** Index */
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'DESC'],
          [_Foto2.default, 'id', 'DESC'],
        ],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },
      });
      return res.status(200).json(alunos);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  /** Show */
  async show(req, res) {
    try {
      const {
        id,
      } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [[_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },

      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      }

      return res.status(200).json({
        aluno,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  /** Update */
  async update(req, res) {
    try {
      const {
        id,
      } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      }

      const novoALuno = await aluno.update(req.body);
      return res.status(200).json({
        novoALuno,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  /** Delete */
  async delete(req, res) {
    try {
      const {
        id,
      } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      if (Number.isNaN(Number(id))) {
        return res.status(400).json({
          errors: ['Isto não é um número.'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      }

      await aluno.destroy();

      return res.status(200).json({
        msg: ['Apagado com sucesso.'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

exports. default = new AlunoController();
