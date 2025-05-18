import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB connected successfully DB host :${connection.connection.host}`);
        return connection;
    } catch (e){
        console.log("MongoDB connection error", e);
        process.exit(1);
    }
}
export default connectDB    