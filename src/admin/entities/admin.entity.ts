import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Listing } from "src/listing/entities/listing.entity";


@Entity()
export class Admin {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @Column({ default: 'admin' })
    role: string; 
}
