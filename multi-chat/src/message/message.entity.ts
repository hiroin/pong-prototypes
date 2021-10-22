import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  constructor(sender: string, message: string, roomId: number) {
    super();
    this.sender = sender;
    this.message = message;
    this.room = roomId;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public sender: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public message: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public date: Date;

  @Column({
    type: 'integer',
    nullable: false,
  })
  public room: number;
}
