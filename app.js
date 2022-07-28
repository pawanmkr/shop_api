const express = require('express');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user')
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://pawan:' +
    process.env.MONGOPASS +
    '@cluster0.lbmywk1.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Allow-Control-Allow-Origin', '*');
    res.header('Allow-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if(res.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'PUT, POST, GET PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res , next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;