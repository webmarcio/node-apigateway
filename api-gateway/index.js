require("dotenv-safe").load();

const jwt = require('jsonwebtoken');
const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');

const app = express();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userServiceProxy = httpProxy('http://localhost:3001');
const productsServiceProxy = httpProxy('http://localhost:3002');

function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];

  /**
   * 
   * Montar uma solução para verificar se o jwt está na blacklist.
   * 
   */

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    req.userId = decoded.id;
    next();
  });
}

app.post('/login', (req, res, next) => {
  /**
   * Montar solução para ver se o usuario existe no banco
   * 
   */
  if(req.body.user === 'marcio' && req.body.pwd === '123'){

    const id = 1; //esse id viria do banco de dados

    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 864000 // expires in 1d
    });
    res.status(200).send({ auth: true, token: token });
  }
  /**
   * Montar uma solução caso o usuario não exista no banco
   * deverá redirecionar a tela de login
   * 
   */
  res.status(500).send('Login inválido!');
});

app.post('/logout', function(req, res) {
  /**
   * 
   * Montar uma solução para incluir o token na blacklist de jwt's
   * 
   */
  res.status(200).send({ auth: false, token: null });
});

// Proxy request
app.get('/api/users', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

app.get('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

app.post('/api/user', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

app.put('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

app.delete('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});


const server = http.createServer(app);
server.listen(3000);
