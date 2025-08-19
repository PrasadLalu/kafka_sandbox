import kafka from './setup';

const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
    try {
        await consumer.connect();
        console.log('🔌✨ Kafka Consumer Connected!');

        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
        console.log(`📡✅ Subscribed to topic: test-topic`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('📨 New message received:');
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value?.toString(),
                });
            },
        });
    } catch (error) {
        console.error(`❌ Consumer error: ${error}`);
    }
    
}

runConsumer();
