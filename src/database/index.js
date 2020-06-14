import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import Photo from '../models/Photo';

const models =  [Student, User, Photo];

const connection =  new Sequelize(dbConfig);
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));