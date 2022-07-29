const Express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/products');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const router = Express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

//GET Request for all entries
router.get('/', (req, res) => {
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
});

//GET ID Wise
router.get('/:productId', (req, res) => {
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
});

//POST Request
router.post('/', checkAuth, upload.single('productImage'), (req, res) => {
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
        res.status(200).json(result);
    }).
    catch( (err) => {
        console.log("error while POST: " + err);
        res.status(500).json(err);
    });
});

//PATCH for updating
router.patch('/:productId', checkAuth, (req, res) => {
    const id = req.params.productId;

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
router.delete('/:productId', checkAuth, (req, res) => {
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