import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {}
  async show(req, res) {}
  async storeNewUser(req, res) {
    /**
     * tipo 0 => sucesso
     * tipo 1 => parametros insuficientes
     * tipo 2 => usuario já existe
     * tipo 3 => erro interno
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ tipo: 1, message: 'parametros insuficientes' });
    }

    try {
      const { name, email } = req.body;

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
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ tipo: 1, message: 'parametros insuficientes' });
    }
    const { userId } = req;

    const user = await User.findByPk(userId);

    try {
      const { name, email, password, oldPassword } = req.body;

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

  async delete(req, res) {}
}

export default new UserController();
