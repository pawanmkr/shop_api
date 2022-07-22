import Express from "express";
const router = Express.Router();

router.get('/', (req, res) => {
    res.send('orders has been fetched...bro');
});

router.post('/', (req, res) => {
    res.send('order placed successfully...bro');
});

router.patch('/:orderId', (req, res) => {
    res.send(`address updated successfully...here's your order ID: ${req.params.orderId}`);
});

router.delete('/:orderId', (req, res) => {
    res.send(`cancellation request accepted...fuck you & money will be refunded...fuck you asshole again`);
});

export default router;