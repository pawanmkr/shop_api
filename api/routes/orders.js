const Express = require('express');
const checkAuth = require('../middlewares/check-auth');
const orderController = require('../controllers/orders');

const router = Express.Router();

router.get('/', checkAuth, orderController.getAllOrders);
router.get('/:orderId', checkAuth, orderController.getOrderByID);
router.post('/', checkAuth, orderController.createOrder);
router.delete('/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;