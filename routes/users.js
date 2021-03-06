const router = require('express').Router();

const { validateUserUpdate } = require('../middlewares/validation');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
