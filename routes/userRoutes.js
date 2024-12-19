const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;