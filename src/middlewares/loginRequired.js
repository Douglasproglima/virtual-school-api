import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).json({
      erros: ['Login não autorizado'],
    });
  }

  const [text, token] =  authorization.split(' ');
  try {
    const dates = jwt.verify(token, process.env.TOKEN_SECRET);

    //Atrelando os dados na requisição, qualquer page que obter esse middleware na requisição irá ter o user e password
    const { id, email } = dates;

    const user = await User.findOne({
      where: {
        id: id,
        email: email
      }
    });

    if(!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      erros: ['Token expirado ou inválido.'],
    });
  }

};