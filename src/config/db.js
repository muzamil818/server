const mongoose = require('mongoose');


const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb conntected");
        
    }catch(err){
        console.error("Something went wrong!", err);
        process.exit(1)
    }
}

module.exports = connectToDb