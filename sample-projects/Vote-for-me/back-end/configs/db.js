const mongoose = require('mongoose');

//Thuc hien bat dong bo trong qua trinh ket noi DB
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URI,{
            //Tranh viec in ra canh bao
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log("DB connect successfully");
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = {connectDB}