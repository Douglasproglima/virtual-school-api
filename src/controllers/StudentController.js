import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['id', 'student_id', 'filename', 'originalname', 'url' ],
        },
     });
      return res.json(students);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message)
      });
    }
  }

  async store(req, res) {
    try {
        const newStudent = await Student.create(req.body);
        const { id, name, lastname, email, age, weightm, height } = newStudent;

        return res.json({ id, name, lastname, email, age, weightm, height });
      } catch (err) {
        return res.status(400).json({
          errors: err.errors.map((erro) => erro.message)
        });
      }
    }

    async show(req, res) {
      try {
        const { id } = req.params;
        if(!id) {
          return res.status(400).json({
            errors: ['Id não encontrado'],
           });
        }

        const student = await Student.findByPk(
          id,
          {
            attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
            order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
            include: {
              model: Photo,
              attributes: ['id', 'student_id', 'filename', 'originalname', 'url' ],
            },
          }
        );
        if(!student) {
          return res.status(400).json({
            errors: ['Aluno não encontrado'],
           });
        }

        const { name, lastname, email, age, weightm, height } = student;
        //return res.json({ name, lastname, email, age, weightm, height });
        return res.json(student);

      } catch (err) {
        return res.status(400).json({
          errors: err.errors.map((erro) => erro.message)
        });
      }
    }

    async update(req, res) {
      try {
        const { id } = req.params;
        if(!id) {
          return res.status(400).json({
            errors: ['Id não encontrado'],
           });
        }

        const student = await Student.findByPk(id);
        if(!student) {
          return res.status(400).json({
            errors: ['Aluno não encontrado'],
           });
        }

        const studentUpdate = student.update(req.body);
        //const {name, lastname, email, age, weightm, height} = studentUpdate;
        //return res.json({name, lastname, email, age, weightm, height});
        return res.json(studentUpdate);
      } catch (err) {
        return res.status(400).json({
          errors: err.errors.map((erro) => erro.message)
        });
      }
    }

    async delete(req, res) {
      try {
        const { id } = req.params;
        if(!id) {
          return res.status(400).json({
            errors: ['Id não encontrado'],
           });
        }

        const student = await Student.findByPk(id);
        if(!student) {
          return res.status(400).json({
            errors: ['Aluno não encontrado'],
           });
        }

        await student.destroy();
        return res.json({
          deleted: 'Registro deletado com sucesso',
        });
      } catch (err) {
        return res.status(400).json({
          errors: err.errors.map((erro) => erro.message)
        });
      }
    }
}

export default new StudentController();