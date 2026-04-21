import { Kafka } from 'kafkajs';
import { app } from './app';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const start = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'message:created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value?.toString(),
      });
    },
  });

  app.listen(3000, () => {
    console.log('Notification Service: Listening on port 3000');
  });
};

start();
