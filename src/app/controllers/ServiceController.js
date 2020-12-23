import * as Yup from 'yup';
import Service from '../models/Service';
import User from '../models/User';
import Department from '../models/Department';

class ServiceController {
  async index(req, res) {
    try {
      const services = await Service.findAll({
        attributes: [
          'description',
          'status',
          'service_done',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
            as: 'user',
          },
          {
            model: User,
            attributes: ['id', 'name'],
            as: 'responsable',
          },
          {
            model: Department,
            attributes: ['id', 'name'],
            as: 'department',
          },
        ],
      });

      return res.json(services);
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async listUserServices(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().integer(),
    });
    if (req.body.user_id) {
      try {
        if (!(await schema.isValid(req.body))) {
          return res
            .status(400)
            .json({ error: 1, message: 'parametros inválidos' });
        }
        const userExists = await User.findOne({
          where: { id: req.body.user_id },
        });
        if (!userExists) {
          return res
            .status(400)
            .json({ error: 2, message: 'esse usuário não existe' });
        }
        const services = await Service.findAll({
          where: { user_id: req.body.user_id },
          attributes: [
            'description',
            'status',
            'service_done',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
              as: 'user',
            },
            {
              model: User,
              attributes: ['id', 'name'],
              as: 'responsable',
            },
            {
              model: Department,
              attributes: ['id', 'name'],
              as: 'department',
            },
          ],
        });

        return res.json(services);
      } catch (error) {
        return res.status(500).json({ error: 3, message: 'erro interno' });
      }
    } else {
      try {
        const userExists = await User.findOne({
          where: { id: req.userId },
        });
        if (!userExists) {
          return res
            .status(400)
            .json({ error: 2, message: 'esse usuário não existe' });
        }
        const services = await Service.findAll({
          where: { user_id: req.userId },
          attributes: [
            'description',
            'status',
            'service_done',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
              as: 'user',
            },
            {
              model: User,
              attributes: ['id', 'name'],
              as: 'responsable',
            },
            {
              model: Department,
              attributes: ['id', 'name'],
              as: 'department',
            },
          ],
        });

        return res.json(services);
      } catch (error) {
        return res.status(500).json({ error: 3, message: 'erro interno' });
      }
    }
  }

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
