import { Kafka, Producer } from 'kafkajs';
import { Subjects } from '@vigneshsarathy/shared';

export class MessageCreatedProducer {
  private producer: Producer;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async publish(data: any) {
    await this.producer.connect();
    await this.producer.send({
      topic: Subjects.MessageCreated,
      messages: [{ value: JSON.stringify(data) }],
    });
    await this.producer.disconnect();
  }
}
