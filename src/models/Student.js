import Sequelize,  { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O nome do aluno já existe.',
        },
        validate: {
          len: {
            args: [4, 20],
            msg: 'O campo Nome precisa conter entre 4 há 20 caracteres.',
          },
        },
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O nome do aluno já existe.',
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
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Idade precisa ser um número inteiro.',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Peso precisa ser um número inteiro ou decimal.',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Altura precisa ser um número inteiro ou decimal.',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, {  foreignKey: 'student_id' });
  }
}