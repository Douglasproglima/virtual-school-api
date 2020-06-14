import Sequelize,  { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O nome de usuário já existe.',
        },
        validate: {
          len: {
            args: [4, 20],
            msg: 'O campo Nome precisa conter entre 4 há 20 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe.',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo Senha precisa conter entre 6 há 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if(user.password)
        user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    return this;
  }

  isPasswordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}