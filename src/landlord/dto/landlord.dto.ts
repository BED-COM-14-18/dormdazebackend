import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";
export class LandlordDto {
    
        @ApiProperty({
            description: 'Enter user name',
        })
        @IsString()
        name: string;
        
        @ApiProperty({
            description: 'enter user email',
        })
        @IsEmail()
        email: string;
    
        @ApiProperty({
            description: 'enter password',
        })
        @IsString()
        password: string;
    }
      
