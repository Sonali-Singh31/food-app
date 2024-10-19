const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// routes
// GET 
router.get('/getUser',authMiddleware,getUserController)

// UPDATE
router.put('/updateUser',authMiddleware,updateUserController)

// password update
router.post('/updatePassword',authMiddleware,updatePasswordController)

// reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)

// DELETE USER
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports = router;