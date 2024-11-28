import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
  
  @Entity()
  export class Listing {
    @PrimaryGeneratedColumn()
    id: number;
  

  @Column({ type: 'varchar', length: 255 })
  Hostelname: string; 

  @Column({ type: 'text' })
  description: string; 

  @Column('simple-array')
  roomType: string[]; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rentalFee: number; 

  @Column('simple-array')
  image: string[];  

  }
  
  
  
  
  
