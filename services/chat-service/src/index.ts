import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { app } from './app';
import { Kafka } from 'kafkajs';
import { MessageCreatedProducer } from './events/message-created-producer';
import { Message } from './models/message';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const kafka = new Kafka({
  clientId: 'chat-service',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const producer = new MessageCreatedProducer(kafka);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', async (data) => {
    const { senderId, text } = data;
    
    const message = Message.build({
      senderId,
      text,
      timestamp: new Date(),
    });
    await message.save();

    console.log('Message saved:', message);
    io.emit('message', message);

    await producer.publish({
      id: message.id,
      senderId: message.senderId,
      text: message.text,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  httpServer.listen(3000, () => {
    console.log('Chat Service: Listening on port 3000');
  });
};

start();
