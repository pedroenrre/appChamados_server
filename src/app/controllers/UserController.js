import * as Yup from 'yup';
import User from '../models/User';
import Department from '../models/Department';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'updatedAt'],
        include: [
          {
            model: Department,
            attributes: ['id', 'name'],
          },
        ],
      });
      return res.json({ tipo: 0, users });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async show(req, res) {
    const user = await User.findAll({ where: {} });
  }

  async storeNewUser(req, res) {
    /**
     * error 0 => sucesso
     * error 1 => parametros insuficientes
     * error 2 => usuario já existe
     * error 3 => erro interno
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      department_id: Yup.number().integer().strict().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 1, message: 'parametros insuficientes' });
    }

    try {
      const { name, email } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res
          .status(400)
          .json({ error: 2, message: 'esse usuario já existe' });
      }

      const newUser = await User.create(req.body);
      return res.json({ tipo: 0, user: newUser });
    } catch (err) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
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
        .json({ error: 1, message: 'parametros insuficientes' });
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
      return res.status(500).json({ error: 10, message: 'erro interno' });
    }
  }

  async delete(req, res) {}
}

export default new UserController();
