import Express from "express";
const router = Express.Router();

router.get('/', (req, res) => {
    res.send('product GET request');
});

router.post('/', (req, res) => {
    res.send('product POST request');
});

router.patch('/:productId', (req, res) => {
    let id = req.params.productId;
    res.send(`product with ${id} has been updated/patched`);
});

router.delete('/:productId', (req, res) => {
    res.send(`${req.params.productId} got deleted successfully!`);
});

export default router;