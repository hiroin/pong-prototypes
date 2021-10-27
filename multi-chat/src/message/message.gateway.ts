import { ConsoleLogger, Inject, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@WebSocketGateway(4000, { namespace: 'message', cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private messageService: MessageService;

  @WebSocketServer()
  private wss;

  private logger: Logger = new Logger('MessageGateway');
  private count = 0;

  public async handleConnection(client: any, ...args: any[]) {
    // console.log('client.id', client.id);

    client.on('room', async (room: number) => {
      console.log('join-room', room);
      client.join(room);
      this.count += 1;
      this.logger.log(`Connected: ${this.count} connections`);
      const messages: Message[] = await this.messageService.getAll(room);
      client.emit('all-messages-to-client', messages);
    });
  }

  handleDisconnect(client: any) {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  afterInit(server: any) {
    this.logger.log(`MessageGateway Initialized`);
  }

  @UseGuards(AuthGuard('jwt'))
  @SubscribeMessage('new-message-to-server')
  public async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { sender: string; message: string; room: number },
  ): Promise<void> {
    const message: Message = await this.messageService.createMessage(
      data.sender,
      data.message,
      data.room,
    );
    this.wss.in(data.room).emit('new-message-to-client', { message });
    // this.wss.emit('new-message-to-client', { message });
    // console.log('--------------');
    // console.log('client.id', client.client.conn.id);
    // console.log('--------------');
    // console.log(Object.keys(this.wss.server.engine.clients));
  }
}
