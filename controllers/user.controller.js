const User = require('../models/user.model');
const { hashPassword, comparePassword, generateToken } = require('../services/auth.service');
const nodemailer = require('nodemailer');

// ایجاد کاربر
const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// ورود به سیستم
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);

    // ارسال توکن از طریق ایمیل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohsensalehi2001@gmail.com',
        pass: 'hkza qqca rgyx dbbq',
      },
    });

    const mailOptions = {
      from: 'mohsensalehi2001@gmail.com',
      to: email,
      subject: 'Your Login Token',
      text: `Your token is: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// دریافت کاربر
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// بروزرسانی کاربر
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (email) user.email = email;
    if (password) user.password = await hashPassword(password);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// حذف کاربر
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser };
