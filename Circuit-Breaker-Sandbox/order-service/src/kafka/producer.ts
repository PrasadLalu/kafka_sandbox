import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('✅ Kafka producer connected successfully');
    } catch (error) {
        console.error('❌ Failed to connect Kafka producer:', error);
    }
};

export const publishPaymentCreated = async (data: any) => {
    await producer.send({
        topic: 'payment_created',
        messages: [
            { value: JSON.stringify(data) },
        ]
    });
}
