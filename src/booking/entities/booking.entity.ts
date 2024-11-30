import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date', nullable: true })
  checkInDate: Date | null; 

  @Column({ type: 'date', nullable: true })
  checkOutDate: Date | null;

  @Column({ type: 'decimal', nullable: true })
  totalPrice?: number;
}

