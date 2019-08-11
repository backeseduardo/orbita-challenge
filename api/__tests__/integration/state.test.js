import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('State', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should list all states from installationss', async () => {
    await factory.createMany('Installation', 50);

    const response = await request(app)
      .get('/states')
      .send();

    expect(response.status).toBe(200);
  });
});
