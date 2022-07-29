const Express = require('express');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const productController = require('../controllers/product');

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

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', checkAuth, upload.single('productImage'), productController.createProduct);
router.patch('/:productId', checkAuth, productController.patchProduct);
router.delete('/:productId', checkAuth, productController.deleteProduct);

module.exports = router;