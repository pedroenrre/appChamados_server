import * as Yup from 'yup';
import Service from '../models/Service';
import User from '../models/User';

class ServiceController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 1, message: 'parametros insuficientes' });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res
        .status(400)
        .json({ error: 2, message: 'usuário não encontrado' });
    }

    try {
      const { description } = req.body;

      const newService = await Service.create({
        description,
        user_id: req.userId,
        department_id: user.department_id,
        status: 0,
      });

      return res.json({ tipo: 0, service: newService });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }
}

export default new ServiceController();
