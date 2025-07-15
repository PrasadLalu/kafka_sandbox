import { Router, Request, Response } from 'express';
import { producer } from '../kafka/producer';
import { KAFKA_TOPICS } from '../utils/kafkaTopics';

const userRouter = Router();

userRouter.post('/create', async(req: Request, res: Response) => {
    await producer.send({
        topic: KAFKA_TOPICS.USER_CREATED,
        messages: [
            { value: JSON.stringify(req.body) }
        ],
    });
    return res.status(200).json({ message: '📨 User creation event sent to Kafka' });
});

export default userRouter;
