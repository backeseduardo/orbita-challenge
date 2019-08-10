import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'state'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    const { email } = req.body;

    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      return res.status(400).json({
        error: 'user_exists',
        message: 'User already exists',
      });
    }

    const { id, name, state } = await User.create({
      ...req.body,
      state: req.body.state.toUpperCase(),
    });

    return res.json({ id, name, email, state });
  }

  async update(req, res) {
    const { email, oldPassword, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (password && !oldPassword) {
      return res.status(401).json({
        error: 'Password can only be changed if oldPassword is informed',
      });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, state } = await user.update({
      ...req.body,
      state: req.body.state.toUpperCase(),
    });

    return res.json({ id, name, email, state });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({
        error: 'user_not_exists',
        message: 'User do not exists',
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: 'User deleted',
    });
  }
}

export default new UserController();
