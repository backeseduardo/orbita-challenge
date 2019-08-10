import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async store(req, res) {
    const { name, email, state, password } = req.body;

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

    const { id } = await User.create({
      name,
      email,
      state: state.toUpperCase(),
      password,
    });

    return res.json({ id, name, email, state });
  }

  async update(req, res) {
    const { name, email, oldPassword, password } = req.body;

    const user = await User.findByPk(req.params.id);

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

    await user.update({ name, email, password });

    return res.json({ id: user.id, name, email });
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
