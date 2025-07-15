import { Router, Request, Response } from 'express';
import userRouter from './user.router';

const router = Router();
router.use('/user', userRouter);

router.get('/health-check', (req: Request, res: Response) => {
    return res.send({ message: 'Healthy!' });
});

export default router;
