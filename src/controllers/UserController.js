import User from '../models/User';

class UserController {
  async store(req, res) {
  try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }

  //Index
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']],
      });
      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }

  //Show
  async show(req, res) {
    try {
      //const { id } = req.params;
      const user = await User.findByPk(req.params.id);
      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }

  //Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const userUpdate = await user.update(req.body);
      const {id, name, email} = userUpdate;
      return res.json({id, name, email});
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }

  //Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await user.destroy();
      return res.json({
        message: 'Registro deletado com sucesso',
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }
}

export default new UserController();