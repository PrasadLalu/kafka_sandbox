import mongoose from 'mongoose';
const MONGO_URI = 'mongodb+srv://test-user-01:bVT28WbeaDanrdtT@cluster0.mdhfauk.mongodb.net/kafkadb';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database connected!')
    } catch (error) {
        console.log(`Database error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
