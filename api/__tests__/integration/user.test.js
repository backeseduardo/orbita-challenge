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

  it('should not be able to register with a email that already exists', async () => {
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

  it('should list the stored users for a authenticated user', async () => {
    const usersArray = await factory.createMany('User', 10);

    const user = usersArray[0];

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.length).toBe(10);
    expect(response.body[0]).toHaveProperty('avatar');
  });

  it('should be able to update the logged user information', async () => {
    const user = await factory.create('User');

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .put('/users')
      .send({
        name: 'changed name',
        email: user.email,
        state: user.state,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(user.id);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('changed name');
  });

  it('should not be able to update password without oldPassword', async () => {
    const user = await factory.create('User');

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .put('/users')
      .send({
        name: 'changed name',
        email: user.email,
        state: user.state,
        password: '123456789',
        confirmPassword: '123456789',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'Password can only be changed if oldPassword is informed',
    });
  });

  it('should not be able to update password without correct oldPassword', async () => {
    const user = await factory.create('User');

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .put('/users')
      .send({
        name: 'changed name',
        email: user.email,
        state: user.state,
        oldPassword: '123123123',
        password: '123456789',
        confirmPassword: '123456789',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'Password does not match',
    });
  });

  it('should not be able to update the email if the provided email already exists', async () => {
    const firstUser = await factory.create('User', {
      email: 'test@mail.com',
    });
    const secondUser = await factory.create('User', {
      email: 'test2@mail.com',
    });

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: firstUser.email,
        password: firstUser.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .put('/users')
      .send({
        name: firstUser.name,
        email: secondUser.email,
        state: firstUser.state,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: 'User already exists' });
  });

  it('should be able to update the email if the provided email does not exists', async () => {
    const firstUser = await factory.create('User', {
      email: 'test@mail.com',
    });

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: firstUser.email,
        password: firstUser.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .put('/users')
      .send({
        name: firstUser.name,
        email: 'test2@mail.com',
        state: firstUser.state,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should to delete an user', async () => {
    const usersArray = await factory.createMany('User', 2);

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: usersArray[0].email,
        password: usersArray[0].password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .delete(`/users/${usersArray[1].id}`)
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete an unexisting user', async () => {
    const user = await factory.create('User');

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .delete('/users/10')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
