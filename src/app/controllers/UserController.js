import User from '../models/User';

class UserController {
  async storeNewUser(req, res) {
    /**
     * tipo 0 => sucesso
     * tipo 1 => parametros insuficientes
     * tipo 2 => usuario já existe
     * tipo 3 => erro interno
     */

    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(401)
          .json({ tipo: 1, message: 'paramentros insuficientes' });
      }

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res
          .status(400)
          .json({ tipo: 2, message: 'esse usuario já existe' });
      }

      await User.create(req.body);
      return res.json({ tipo: 0, user: { name, email } });
    } catch (err) {
      return res.status(500).json({ tipo: 3, message: 'erro interno' });
    }
  }

  async update(req, res) {
    const { userId } = req;

    const user = await User.findByPk(userId);

    try {
      const { name, email, password, oldPassword } = req.body;
      if (!name || name === '' || !email || email === '') {
        return res
          .status(401)
          .json({ error: 1, message: 'paramentros insuficientes' });
      }

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res
            .status(400)
            .json({ error: 2, message: 'esse e-mail já existe' });
        }
      }

      if (password && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 3, message: 'Senha inválida!' });
      }

      user.update(req.body);

      return res.json({ tipo: 0, user: { name, email } });
    } catch (err) {
      return res.status(500).json({ tipo: 10, message: 'erro interno' });
    }
  }
}

export default new UserController();
