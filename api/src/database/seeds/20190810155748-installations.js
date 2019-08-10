const data = require('../../../../solar_data.json');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'installations',
      data.map(item => ({
        data_provider: item['Data Provider'],
        date: item['Installation Date'],
        system_size: item['System Size'],
        zip_code: item['Zip Code'],
        state: item.State,
        cost: item.Cost,
        created_at: new Date(),
        updated_at: new Date(),
      })),
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('installations', null, {});
  },
};
