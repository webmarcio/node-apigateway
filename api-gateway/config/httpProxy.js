const httpProxy = require('express-http-proxy');

const userServiceProxy = httpProxy('http://localhost:3001');

module.exports = {
    userServiceProxy
}
