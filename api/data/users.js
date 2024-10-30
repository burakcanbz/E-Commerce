const bcrypt = require('bcryptjs');


const users = [
    {
        name: 'Admin User',
        email: 'burak.canbaz@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Johnny Lesh',
        email: 'johnny@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Susan Van Dyke',
        email: 'susan@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
];

module.exports = users;