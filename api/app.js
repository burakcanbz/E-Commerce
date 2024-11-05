const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const { productRouter } = require('./routes/productRoutes'); 
const { userRouter } = require('./routes/userRoutes'); 

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cors for cross origin
app.use(cors({
    origin : 'http://localhost:5000',
    credentials: true
}))

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use('/*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})

