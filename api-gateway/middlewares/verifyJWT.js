require("dotenv-safe").load();
const jwt = require('jsonwebtoken');

const verifyJWT = function (req, res, next){
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

module.exports = verifyJWT;
