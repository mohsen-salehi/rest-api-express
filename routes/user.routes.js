const express = require('express');
const { createUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:id', authMiddleware, getUser);
router.put('/user/:id', authMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, deleteUser);

module.exports = router;
