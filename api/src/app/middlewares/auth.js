import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'token_not_found', message: 'Token not found' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    req.userState = decoded.state;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'invalid_token', message: 'Invalid token' });
  }
};
