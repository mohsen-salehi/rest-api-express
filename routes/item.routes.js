const express = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/item.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/items', authMiddleware, createItem);
router.get('/items', authMiddleware, getItems);
router.get('/items/:id', authMiddleware, getItem);
router.put('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItem);

module.exports = router;
