import mongoose from 'mongoose';
import {} from 'dotenv/config'

export const connectBD = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb is connected with ${connection.host}`);
}