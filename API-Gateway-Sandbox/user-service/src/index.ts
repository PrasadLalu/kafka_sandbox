import connectDB from './config/database';
import { createNewUser } from './services/user.service';

console.log('Hello World!');

const start = async () => {
    connectDB();
    createNewUser();
}

start().catch(console.error);
