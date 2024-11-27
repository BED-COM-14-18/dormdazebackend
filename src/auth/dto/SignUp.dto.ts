import { ApiProperty } from '@nestjs/swagger';  
import { IsNotEmpty, IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';

export class SignUpDto {

  @ApiProperty({
    description: 'name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: 'email address',
    type: String,

  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;

  @ApiProperty({
    description: 'password ',
    type: String,
    minLength: 6,
  
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;

  @ApiProperty({
    description: 'Indicate if you are the landlord',
    type: Boolean,
 
  })
  @IsBoolean()
  landlord: boolean;

  @ApiProperty({
    description: 'Indicate if you are the admin',
    type: Boolean,
  
  })
  @IsBoolean()
  admin: boolean;
}
