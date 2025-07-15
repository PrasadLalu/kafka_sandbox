import { kafka } from '../kafka/setup';
import { KAFKA_TOPICS } from '../utils/kafkaTopics';

const consumer = kafka.consumer({ groupId: 'user-service-group' });

export const createNewUser = async () => {
    await consumer.connect();
    console.log('✅ Kafka Consumer connected');

    await consumer.subscribe({ topic: KAFKA_TOPICS.USER_CREATED, fromBeginning: true });
    console.log(`📡 Subscribed to topic: ${KAFKA_TOPICS.USER_CREATED}`);

    await consumer.run({
        eachMessage: async ({ message }) => {
            const value = message.value?.toString();
            if (!value) return;

            try {
                const userData = JSON.parse(value);
                console.log('🟢 User saved to MongoDB:', userData);
            } catch (err) {
                console.error('❌ Failed to process message', err);
            }
        },
    });   
}
