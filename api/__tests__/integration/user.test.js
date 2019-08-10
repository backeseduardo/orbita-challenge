import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when it is created', async () => {
    const user = await factory.create('User', {
      password: '123123123',
      confirmPassword: '123123123',
    });

    const compareHash = await bcrypt.compare('123123123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        ...user,
        confirmPassword: user.password,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('not be able to register with a email that already exists', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send({
        ...user,
        confirmPassword: user.password,
      });

    const response = await request(app)
      .post('/users')
      .send({
        ...user,
        confirmPassword: user.password,
      });

    expect(response.status).toBe(400);
  });
});
