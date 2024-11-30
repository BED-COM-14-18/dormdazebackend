
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('auth')
export class Auth {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string | null;  // Optional field for storing refresh tokens

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // You can add additional fields like verification status if needed
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;
}


