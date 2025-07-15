import { createServer, Server } from 'http';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes';
import { initProducer } from './kafka/producer';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRoutes);

const server: Server = createServer(app);
server.listen(PORT, () => {
    initProducer();
    console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});
