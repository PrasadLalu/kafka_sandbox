import { Request, Response, Router } from 'express';

const router = Router();

router.post('/make-payment', (req: Request, res: Response) => {
    const data = req.body;

    console.log('💸🧾  Received Payment Request');
    console.log('📦 Order Details:', JSON.stringify(data, null, 2));
    console.log('✅ Payment processed successfully');

    return res.send({ message: 'payment success', data });
});

router.get('/health-check', (req: Request, res: Response) => {
    return res.send({ message: 'Healthy!' });
});

export default router;
