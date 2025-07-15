import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092'],
});

export const producer = kafka.producer();

export const initProducer = async () => {
    await producer.connect();
    console.log('✅ Kafka Producer connected');
}
