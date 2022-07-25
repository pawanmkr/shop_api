const Express = require('express');
const mongoose = require('mongoose');
const Orders = require('../models/orders');
const Product = require('../models/products');

const router = Express.Router();

// fetch all the orders
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

// fetch single order
router.get('/:orderId', (req, res) => {
    let id = req.params.orderId;
    Orders.findById(id).select('product quantity _id')
    .exec()
    .then((doc) => {
        res.send({
            Id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
                type: 'GET',
                url: 'http://localhost:9000/orders/' + doc._id
            }
        })
    })
    .catch((error) => {
        res.status(404);
        res.send('Order do not exist');
    });
});

// place/create order
router.post('/', (req, res) => {
    Product.findById(req.body.productId)
    .then(product => {
        const order = new Orders({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order.save();
    })
    .then((result) => {
        res.status(200);
        res.send({
            Message: 'order stored successfully',
            Details: {
                ID: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:9000/orders/' + result._id
            }
        });
    })
    .catch((error) => {
        res.status(500).send({
            message: "This product is not available",
            error: error
        });
    });

});

// delete orders
router.delete('/:orderId', (req, res, next) => {
    Orders.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
        res.status(200);
        res.send({
            Message: 'order deleted successfully',
            Details: {
                ID: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'POST',
                url: 'http://localhost:9000/orders/' + req.params.orderId
            }
        });
    })
    .catch((error) => {
        res.status(500).send({
            message: "Can't find the given order or does not exist",
            error: error
        });
    });
});

module.exports = router;