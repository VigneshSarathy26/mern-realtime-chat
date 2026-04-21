import mongoose from 'mongoose';

interface MessageAttrs {
  senderId: string;
  text: string;
  timestamp: Date;
}

interface MessageDoc extends mongoose.Document {
  senderId: string;
  text: string;
  timestamp: Date;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>('Message', messageSchema);

export { Message };
