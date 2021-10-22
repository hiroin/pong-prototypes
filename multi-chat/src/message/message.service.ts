import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  public getAll = async (roomnum: number): Promise<Message[]> => {
    return Message.find({ room: roomnum });
  };

  public createMessage = async (
    sender: string,
    message: string,
    room: number,
  ): Promise<Message> => {
    const newMessage: Message = new Message(sender, message, room);
    return await newMessage.save();
  };
}
