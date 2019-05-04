require("dotenv-safe").load();
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();


router.post('/login', (req, res, next) => {
  /**
   * Montar solução para ver se o usuario existe no banco
   * 
   */
  if(req.body.user === 'marcio' && req.body.pwd === '123'){

    const payload = {
      id: 1
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '1d'// expires in 1d
    });

    res.status(200).json({ 
      auth: true,
      token
    });
  }

  res.status(401).json({
    message: 'Dados Inválidos'
  });
  /**
   * Montar uma solução caso o usuario não exista no banco
   * 
   */
});

router.post('/logout', function(req, res) {
  /**
   * 
   * Montar uma solução para incluir o token na blacklist de jwt's
   * 
   */
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;

