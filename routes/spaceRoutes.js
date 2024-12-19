const express = require('express');
const spaceController = require('../controllers/spaceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, spaceController.createSpace);
router.get('/', authMiddleware, spaceController.getAllSpaces);
router.get('/:id', authMiddleware, spaceController.getSpaceById);
router.put('/:id', authMiddleware, spaceController.updateSpace);
router.delete('/:id', authMiddleware, spaceController.deleteSpace);

module.exports = router;