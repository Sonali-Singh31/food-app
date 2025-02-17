const express = require('express');
const { testUserController } = require('../controllers/testController');

// router object
const router = express.Router();

// routes GET|POST|PATCH|DELETE
router.get('/test-user',testUserController);

// export
module.exports = router;