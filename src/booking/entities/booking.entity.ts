import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Listing } from 'src/listing/entities/listing.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  
  id: string; 
  
  //@ManyToOne(() => AccomodationListing, (accomodation) => accomodation.bookings, { eager: true })
  //@JoinColumn({ name: 'accomodationId' })
  //accomodation: AccomodationListing;

  //@Column()
  //userId: string;  // Foreign key to the User table

  @Column()
  accomodationId: string; // Foreign key to the Accommodation table

  @Column({ type: 'date', nullable: true })
  checkInDate: Date | null; // Ensure this is of type 'Date'

  @Column({ type: 'date', nullable: true })
  checkOutDate: Date | null;

  //@Column()
  //status: string;

 // @Column()
 // paymentStatus: string;

  @Column({ type: 'decimal', nullable: true })
  totalPrice?: number;
}

