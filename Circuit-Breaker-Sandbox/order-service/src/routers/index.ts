import { Request, Response, Router } from 'express';
import { processPayment } from '../services/payment.service';
import { publishPaymentCreated } from '../kafka/producer';

const router = Router();

router.post('/order', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const paymentResult = await processPayment(data);
        console.log('💰 Payment Received Successfully');
        if (paymentResult.error) throw new Error(paymentResult.error);

        await publishPaymentCreated({ ...data, status: 'paid' })
        return res.json({ message: 'Order placed successfully' });
    } catch (error) {
        return res.status(503).json({ error });
    }
});

export default router;
