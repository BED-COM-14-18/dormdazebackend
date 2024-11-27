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
    private agentRepository: Repository<Admin>,
    private jwtService: JwtService
  ){}
  

 async create(createAgentDto: SignUpDto): Promise<{token: string}> {
    const name = (createAgentDto.name);
    const {email,password} = createAgentDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = this.agentRepository.create({
      name: name,
      email: email,
      password: hashedPassword,

    })

    await this.agentRepository.save(newAgent);

    const token = this.jwtService.sign({id: newAgent.id});
    return {token};
  }

  async validate(validateUser: LoginDto):Promise<{token: string}>{

    const {email,password} = validateUser;
    
    const user = await this.agentRepository.findOne({where: {email}});
    
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
    const check = await this.agentRepository.findOne({where:{email}})

    if (!check)
      return false;
    else
      return true;
    
  }

  
  async findOneById(id: string) {
    
    const user = await this.agentRepository.findOne({where:{id: id}});

    if (!user)
      return null;

    return user;

  }

  findAll(){}

  findOne(id: number){}

  update(id: number, updateAgentDto: UpdateAdminDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
