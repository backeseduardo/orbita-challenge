import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Installation', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should list installations on the user state', async () => {
    const user = await factory.create('User', {
      state: 'CA',
    });

    await factory.createMany('Installation', 10, {
      state: 'CA',
    });

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = responseSession.body;

    const response = await request(app)
      .get('/installations')
      .query({ page: 1 })
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('limit');
    expect(response.body).toHaveProperty('numPages');
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('rows');
  });

  it('should not list installations if the user do not send page as query param', async () => {
    const user = await factory.create('User', {
      state: 'CA',
    });

    await factory.createMany('Installation', 10, {
      state: 'CA',
    });

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = responseSession.body;

    const response = await request(app)
      .get('/installations')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should count installations on the user state', async () => {
    const user = await factory.create('User', {
      state: 'CA',
    });

    await factory.createMany('Installation', 10, {
      state: 'CA',
    });

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = responseSession.body;

    const response = await request(app)
      .get('/installations/count')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toStrictEqual({
      count: 10,
      state: 'CA',
    });
  });

  it('should return the most expensive installation on the user state', async () => {
    const user = await factory.create('User', {
      state: 'CA',
    });

    await factory.createMany('Installation', 10, {
      state: 'CA',
    });

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const { token } = responseSession.body;

    const response = await request(app)
      .get('/installations/most-expensive')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('data_provider');
    expect(response.body).toHaveProperty('cost');
  });
});
