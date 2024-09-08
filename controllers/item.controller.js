const Item = require('../models/item.model');

// ایجاد آیتم
const createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const item = await Item.create({ name, description });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
};

// دریافت لیست آیتم‌ها
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

// دریافت آیتم خاص
const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};

// بروزرسانی آیتم
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (name) item.name = name;
    if (description) item.description = description;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

// حذف آیتم
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };
