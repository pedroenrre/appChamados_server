/**
 * Esse middleware verifica se o usuário possui autorização
 * de manager para realizar as ações da rota subsequente
 */

import Department from '../models/Department';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Department,
          attributes: ['manager_department'],
        },
      ],
    });

    if (!user.Department.manager_department) {
      return res
        .status(401)
        .json({ message: 'Rota inacessível para esse usuário' });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: 3, message: 'erro interno' });
  }
};
