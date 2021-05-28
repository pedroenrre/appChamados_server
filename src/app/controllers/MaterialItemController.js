import * as Yup from 'yup';

import MaterialItem from '../models/MaterialItem';
import Material from '../models/Material';

class MaterialItemController {
  async index(req, res) {
    try {
      const materiais = await MaterialItem.findAll({});
      return res.json({ tipo: 0, materiais });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async show(req, res) {}

  async store(req, res) {
    const { is_permanent } = await Material.findByPk(req.body.material_id);
    const schema = Yup.object().shape({
      tombo: is_permanent ? Yup.string().required() : Yup.string(),
      material_id: Yup.number().required(),
      department_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 1, message: 'parametros insuficientes' });
    }
    try {
      const newMaterialItem = await MaterialItem.create(req.body);
      return res.json({ tipo: 0, user: newMaterialItem });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new MaterialItemController();
