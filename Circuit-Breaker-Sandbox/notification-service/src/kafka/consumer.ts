import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order_notifier' });

const run = async () => {
    await consumer.connect();
    console.log('✅ Consumer connected');

    await consumer.subscribe({ topic: 'payment_created', fromBeginning: true });
    console.log('📡 Subscribed to topic: test-topic');

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = JSON.parse(message.value!.toString());
            console.log(`📧 Notifying user ${payload.user_id} for payment of ₹${payload.amount}`);
        },
    });
};

run();
