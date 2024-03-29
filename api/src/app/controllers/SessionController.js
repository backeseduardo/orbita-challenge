import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        state: user.state,
        avatar: user.avatar,
      },
      token: jwt.sign(
        { id: user.id, email: user.email, state: user.state },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

export default new SessionController();
