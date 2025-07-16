import cors from 'cors';
import { createServer, Server } from 'http';
import express, { Express } from 'express';
import { connectProducer } from './kafka/producer';
import apiRoutes from './routers';

const app: Express = express();
const PORT = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const start = async () => {
    await connectProducer();
    const server: Server = createServer(app);
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();
