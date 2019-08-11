import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Installation from '../src/app/models/Installation';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  state: faker.address.stateAbbr(),
  password: faker.internet.password(10),
});

factory.define('Installation', Installation, {
  data_provider: faker.company.companyName(),
  date: faker.date.between('2009-01-01', '2019-01-01'),
  system_size: faker.random.number({
    min: 0,
    max: 100,
    precision: 3,
  }),
  zip_code: faker.address.zipCode(),
  state: faker.address.stateAbbr(),
  cost: faker.random.number({
    min: 0,
    max: 100000,
    precision: 3,
  }),
});

export default factory;
