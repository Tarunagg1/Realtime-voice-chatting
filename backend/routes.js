const router = require('express').Router();
const authController = require('./conntrollers/auth.controller');
const activateController = require('./conntrollers/activateController');
const authMiddleware = require('./middleware/authMiddleware');
const roomsController = require('./conntrollers/roomsController');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);

router.post('/api/activate',authMiddleware, activateController.activate);

router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);

router.post('/api/rooms', authMiddleware, roomsController.create);
router.get('/api/rooms', authMiddleware, roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);

router.get('/api/test', (req, res) => res.json({ msg: 'OK' }));

module.exports = router;