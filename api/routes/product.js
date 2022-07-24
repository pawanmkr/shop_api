const Express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/products');

const router = Express.Router();

//GET Request for all entries
router.get('/', (req, res) => {
    Product.find().limit(100).
    exec().
    then((doc) => {
        if (doc) {
            console.log(doc);
            res.status(200).json(doc);
        } else {
            res.send('Found 0 Products');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

//GET ID Wise
router.get('/:productId', (req, res) => {
    let id = req.params.productId;
    Product.findById(id).
    exec().
    then((doc) => {
        if (doc) {
            console.log(doc);
            res.status(200).json(doc);
        } else {
            res.send('No valid entry found with this productID');
        }
    }).
    catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//POST Request
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

//PATCH for updating
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    // const updateOperations = {};

    // for (const ops of req.body) {
    //     updateOperations[ops.propName] = ops.propValue;
    // }
    // Product.updateOne({_id: id}, { 
    //     $set: updateOperations
    // }).
    // exec().
    // then((result) => {
    //     res.status(200).json(result);
    // }).
    // catch((err) => {
    //     res.status(500);
    //     res.send(err);
    // });

    Product.findByIdAndUpdate(id, {$set: req.body}, {new: true}).
    exec().
    then((result) => {
        res.status(200).json(result);
    }).
    catch((err) => {
        res.status(500);
        res.send(err);
    });
});

//DELETE for removing ID Wise
router.delete('/:productId', (req, res) => {
    let id = req.params.productId;
    Product.remove({_id: id}).exec().then(() => {
        res.send(`${req.params.productId} got deleted successfully!`);
    }).catch(
        (error) => {
            res.status(500).json(
                {
                    error: error
                }
            );
        }
    );
});

module.exports = router;