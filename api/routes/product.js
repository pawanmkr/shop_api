const Express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/products');

const router = Express.Router();

router.get('/', (req, res) => {
    res.send('product GET request');
});

router.get('/:productId', (req, res) => {
    let id = req.params.productId;
    Product.findById(id).
    exec().
    then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
    }).
    catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.
    save().
    then(result => {
        console.log(result);
        res.status(200).json(result);
    }).
    catch( (err) => {
        console.log("error while POST: " + err);
        res.status(500).json(err);
    });
});

router.patch('/:productId', (req, res) => {
    
});

router.delete('/:productId', (req, res) => {
    res.send(`${req.params.productId} got deleted successfully!`);
});

module.exports = router;