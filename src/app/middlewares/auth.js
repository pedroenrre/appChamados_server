/**
 * Esse middleware verifica se o token enviado é válido
 */

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers['x-auth-token'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de usuário não enviado' });
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret); // se não retornar, cai no cacth

    // se o token é válido, posso inserir o id do usuário na minha requisição
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token de auntenticação inválido' });
  }
};
