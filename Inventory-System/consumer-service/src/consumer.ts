import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'consumer-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group-001' });

const runConsumer = async () => {
    try {
        await consumer.connect();
        console.log('🔌✨ Kafka Consumer Connected!');

        await consumer.subscribe({ topic: 'topic-001', fromBeginning: true });
        console.log(`📡✅ Subscribed to topic: test-topic`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    // value: message.value?.toString(),
                });

                const rawValue = message.value?.toString();
                const parsedData = JSON.parse(rawValue!);
                console.log(parsedData);
                console.log('📨 New message received:');
            }
        });
    } catch (error) {
        console.error(`❌ Consumer error: ${error}`);
    }
}

runConsumer();
