import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { id, name, state } = user;

    return res.json({
      user: { id, name, state },
      token: jwt.sign({ id, name, state }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
