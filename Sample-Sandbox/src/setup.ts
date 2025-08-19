import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'nodejs-kafka-app',
    brokers: ['localhost:9092'],
});

export default kafka;
