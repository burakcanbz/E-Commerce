const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        console.log(process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected : ${connection.connection.host}`)
    }   
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;