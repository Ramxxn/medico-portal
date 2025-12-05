import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/icrb`

const connectDB = async () => {
    await mongoose.connect(uri)
    mongoose.connection.on('connected', () => console.log(`database connected to ${uri}`))
}

export default connectDB