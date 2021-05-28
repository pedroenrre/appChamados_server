import * as Yup from 'yup';

import Material from '../models/Material';

class MaterialController {
  async index(req, res) {
    try {
      const materiais = await Material.findAll({});
      return res.json({ tipo: 0, materiais });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async show(req, res) {}

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      quantity: Yup.number().required(),
      is_permanent: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 1, message: 'parametros insuficientes' });
    }
    try {
      const newMaterial = await Material.create(req.body);
      return res.json({ tipo: 0, user: newMaterial });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new MaterialController();
