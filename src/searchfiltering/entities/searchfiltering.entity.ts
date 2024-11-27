import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Searchfiltering {

    @PrimaryGeneratedColumn('uuid')
    searchfilter_id: string

    @Column()
    title: string;
  
    @Column()
    roomType?: string;
  
    @Column({ type: 'enum', enum: ['urban', 'rural'] })
    locationType: 'urban' | 'rural'; // Location type (urban/rural)
  
    @Column({ type: 'int' })
    spaceAvailable: number; 

    @Column()
    rentalfee: number;
  
    @Column()
    rentalfee_Min: number;
  
    @Column()
    rentalfee_Max: number;
  }

