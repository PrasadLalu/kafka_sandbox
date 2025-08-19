import { Kafka } from "kafkajs";
import { faker } from '@faker-js/faker'

const kafka = new Kafka({
    clientId: "producer-service",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async () => {
    try {
        await producer.connect();
        console.log("🔌✨ Kafka Producer Connected!");

        const batchSize = 10;
        const totalMessages = 100;

        for (let i = 0; i < totalMessages; i += batchSize) { 
            const messages = Array.from({ length: batchSize }).map(() => {
                const user = {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    address: faker.location.streetAddress(),
                    city: faker.location.city(),
                    country: faker.location.country(),
                };
                return { value: JSON.stringify(user) }
            });

            await producer.send({
                topic: 'topic-001',
                messages
            });
            console.log(`📨 Sent batch ${i / batchSize + 1}`);
        }
        console.log('✅ Message sent');
    } catch (error) {
        console.error(`❌ Producer error: ${error}`);
    } finally {
        await producer.disconnect();
        console.log("🔒💤 Kafka Producer Disconnected!");
    }
};

runProducer();
