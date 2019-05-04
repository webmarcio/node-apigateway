const express = require('express');
const router = express.Router();

const userServiceProxy = require('../config/httpProxy').userServiceProxy;
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/api/users', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

router.get('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

router.post('/api/user', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

router.put('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

router.delete('/api/user/:id', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
});

module.exports = router;
