const express = require('express');
const router = express.Router();
const {
  getPendingUser,
  getPendingUsers,
  signup,
  upload,
  login,
  updatePendingUser,
  deletePendingUser,
} = require("../controllers/authController");
router.post('/login', login);
router.post("/signup", upload, signup);
router.get('/pending',getPendingUsers);
router.get('/pending/:id',getPendingUser)
router.patch('/pending/:id',updatePendingUser)
router.delete('/pending/:id',deletePendingUser)

module.exports = router;
