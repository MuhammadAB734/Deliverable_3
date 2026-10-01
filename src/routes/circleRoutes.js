const express = require('express');
const circleController = require('../controllers/circleController');

const router = express.Router();

router.get('/:id/members', circleController.getMembers);
router.get('/:id/cycles', circleController.getCycles);

module.exports = router;
