import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {

  @ApiProperty({
    description: 'User email',
    type: String,
   
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty({
    description: 'User password ',
    type: String,
    minLength: 5,
  
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 5 characters' })
  password: string;
}
