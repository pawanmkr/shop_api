const mongoose = require('mongoose');
const Product = require('../models/products');

//get all products
exports.getAllProducts = (req, res) => {
    Product.find().limit(100)
    .select('name price _id productImage')
    .exec()
    .then((doc) => {
        if (doc) {
            console.log(doc);
            res.status(200).json(doc);
        } else {
            res.send('Found 0 Products');
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    })
}

exports.getProductById = (req, res) => {
    let id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then((doc) => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.send('No valid entry found with this productID');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

//create a new product
exports.createProduct = (req, res) => {
    console.log(req.body)
    if (!req.file) {
        return res.send('please upload the file');
    }
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.
    save().
    then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product Creation Successfull",
            result: result
        });
    }).
    catch( (err) => {
        console.log("error while POST: " + err);
        res.status(500).json(err);
    });
}

exports.patchProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {$set: req.body}, {new: true}).
    exec().
    then((result) => {
        res.status(200).json(result);
    }).
    catch((err) => {
        res.status(500);
        res.send(err);
    });
}

exports.deleteProduct = (req, res) => {
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
}