import { Injectable,ConflictException } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { LoginDto } from 'src/auth/dto/LogIn.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ){}
  

 async create(adminDto: SignUpDto): Promise<{token: string}> {
    const name = (adminDto.name);
    const {email,password} = adminDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = this.adminRepository.create({
      name: name,
      email: email,
      password: hashedPassword,

    })

    await this.adminRepository.save(newAdmin);

    const token = this.jwtService.sign({id: newAdmin.id});
    return {token};
  }

  async validate(validateUser: LoginDto):Promise<{token: string}>{

    const {email,password} = validateUser;
    
    const user = await this.adminRepository.findOne({where: {email}});
    
      if (!user)
        return null;

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch)
        return null; 
      
      const token = this.jwtService.sign({id: user.id});
      
    return {token};

  }
  
  async findOneByEmail(user : SignUpDto): Promise<boolean> {
    const {email} = user;
    const check = await this.adminRepository.findOne({where:{email}})

    if (!check)
      return false;
    else
      return true;
    
  }

  
  async findOneById(id: number) {
    
    const user = await this.adminRepository.findOne({where:{ id }});

    if (!user)
      return null;

    return user;

  }

  findAll(){
    return this.adminRepository.find();
  }

  findOne(id: number){
    return this.adminRepository.findOneBy({ id });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
