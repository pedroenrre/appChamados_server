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
}

export default new UserController();
