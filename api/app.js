const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const { productRouter } = require('./routes/productRoutes'); 

const app = express();

app.use('/api/products', productRouter);
app.use('/*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})

