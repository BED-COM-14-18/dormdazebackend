import { Injectable,UnauthorizedException,ConflictException } from '@nestjs/common';
import { SignUpDto } from './dto/SignUp.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AdminService } from 'src/admin/admin.service';
import { LandlordService } from 'src/landlord/landlord.service';
import { StudentService } from 'src/student/student.service';
import { LoginDto } from './dto/LogIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly landlordService: LandlordService,
    private readonly studentService: StudentService
  ){}


  async create(createAuthDto: SignUpDto): Promise<{token: string}> {

    const check = await this.adminService.findOneByEmail(createAuthDto);
    const check2 = await this.landlordService.findOneByEmail(createAuthDto);
    const check3 = await this.studentService.findOneByEmail(createAuthDto);
    
    if (check || check2 || check3)
      throw new ConflictException('email address already in use');


    if (createAuthDto.landlord)
      return this.landlordService.create(createAuthDto);
    
    else if(createAuthDto.admin)
      return this.adminService.create(createAuthDto);
    
    else
      return this.studentService.create(createAuthDto);
  
  }


  async validate(validateUser: LoginDto):Promise<{token: string}>{
      
    const token = await this.adminService.validate(validateUser);
    if (token !== null )
      return  token;

    const token1 = await this.studentService.validate(validateUser);
    if (token1 !== null)
      return token1;

    const token2 = await this.landlordService.validate(validateUser);
    if (token2 !== null)
      return token2;

    throw new UnauthorizedException('Invalid email or password');
    
  }


}
