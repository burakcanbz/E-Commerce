const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const { productRoutes } = require('./routes/productRoutes'); 
const { userRoutes } = require('./routes/userRoutes'); 
const { orderRoutes} = require('./routes/orderRoutes');
const { reviewRoutes } = require('./routes/reviewRoutes');
const { paymentRoutes } = require('./routes/paymentRoutes');
// const stripe = require('./config/payment'); // Import the stripe instance from config/payment.js


const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cors for cross origin
app.use(cors({
    origin : true,
    credentials: true
}))

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
// app.use('/api/payment', paymentRoutes);

app.use('/*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(port, '0.0.0.0',() => {
        process.env.NODE_ENV === 'development' && console.log(`Server running on port ${port}`)
    })
})

