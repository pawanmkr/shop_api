const Express = require('express');
const mongoose = require('mongoose');
const orders = require('../models/orders');
const Orders = require('../models/orders');

const router = Express.Router();

router.get('/', (req, res) => {
    Orders.find().select('product quantity _id')
    .exec()
    .then((docs) => {
        if (docs.length > 0) {
            res.send({
                Count: docs.length,
                orders: docs.map((doc) => {
                    return {
                        Id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:9000/orders/' + doc._id
                        }
                    }
                }) 
            })
        }
        else {
            res.send('No orders has been placed yet');
        }
    })
    .catch((error) => {
        res.status(404);
        res.send(error);
    });
});

router.post('/', (req, res) => {
    const order = new Orders({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
    .then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    });

});

router.patch('/:orderId', (req, res) => {
    res.send(`address updated successfully...here's your order ID: 
    ${req.params.orderId}`);
});

router.delete('/:orderId', (req, res) => {
    res.send(`cancellation request accepted...
    fuck you & money will be refunded...fuck you asshole again`);
});

module.exports = router;