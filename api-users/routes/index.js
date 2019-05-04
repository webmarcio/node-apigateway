var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/users', function(req, res, next) {
  res.json({ message: `Visualizar todos os Usuarios` });
});

router.post('/api/user', function(req, res, next) {
  res.json({ message: `Criar um novo usuario` });
});

router.get('/api/user/:id', function(req, res, next) {
  // req.params.id
  res.json({ message: `Visualizar Usuario id ${ req.params.id }` });
});

router.put('/api/user/:id', function(req, res, next) {
  // req.params.id
  res.json({ message: `Editar Usuario id ${ req.params.id }` });
});

router.delete('/api/user/:id', function(req, res, next) {
  // req.params.id
  res.json({ message: `Deletar Usuario id ${ req.params.id }` });
});

module.exports = router;
