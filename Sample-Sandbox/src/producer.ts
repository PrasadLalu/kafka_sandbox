import kafka from './setup';

const producer = kafka.producer();

const runProducer = async () => {
    try {
        await producer.connect();
        console.log('🔌✨ Kafka Producer Connected!');

        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: JSON.stringify({ name: 'Arya', city: 'Bengaluru' }) }
            ],
        });
        console.log('📤✅ Message Sent to Kafka Topic!');
    } catch (error) {
        console.error(`❌ Producer error: ${error}`);
    } finally {
        await producer.disconnect();
        console.log('🔒💤 Kafka Producer Disconnected!');
    }
}

runProducer();
