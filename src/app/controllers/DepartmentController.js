import * as Yup from 'yup';

import Department from '../models/Department';

class DepartmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 1, message: 'parametros insuficientes' });
    }

    try {
      const { name } = req.body;

      const departmentExists = await Department.findOne({ where: { name } });
      if (departmentExists) {
        return res
          .status(400)
          .json({ error: 2, message: 'esse departamento já existe' });
      }

      const newDepartment = await Department.create(req.body);
      return res.json({ tipo: 0, user: newDepartment });
    } catch (error) {
      return res.status(500).json({ error: 3, message: 'erro interno' });
    }
  }
}

export default new DepartmentController();
