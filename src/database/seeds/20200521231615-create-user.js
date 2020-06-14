'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert (
    'users',
    [
      {
        name: 'Joaqui',
        email: 'joaquim_silva@gmail.com',
        password_hash: await bcryptjs.hash('456789', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Juca',
        email: 'juca@gmail.com',
        password_hash: await bcryptjs.hash('789132', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Joao',
        email: 'joao@gmail.com',
        password_hash: await bcryptjs.hash('369852', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
