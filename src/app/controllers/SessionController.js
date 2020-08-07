import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ error: 1, message: 'Usuário não encontrado!' });
      }
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 2, message: 'Senha inválida!' });
      }

      const { id, name } = user;
      return res.json({
        user: {
          id,
          name,
          email,
        },
        // pedroARFGerenciadorDeContas
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }
}

export default new SessionController();
