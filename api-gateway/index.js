const http = require('http');
const app = require('./config/server');
const usersRoutes = require('./routes/users');
const proxyRequest = require('./routes/proxyRequest');

app.use(usersRoutes);
app.use(proxyRequest);

const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server on port 3000');
});
