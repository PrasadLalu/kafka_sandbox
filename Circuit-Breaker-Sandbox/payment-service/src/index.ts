import { createServer, Server } from 'http';
import express, { Express } from 'express';
import cors from 'cors';
import apiRoutes from './routers';

const app: Express = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRoutes);

const start = async () => {
    const server: Server = createServer(app);
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();
