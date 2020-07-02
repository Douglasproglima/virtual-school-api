const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert (
    'users',
    [
      {
        name: "Go Barber",
        email: "admin@admin.com",
        password_hash: bcryptjs.hashSync("123456", 8),
        created_at: new Date(),
        updated_at: new Date()
      },
    ],
    {},
  ),

  down: () => {},
};
