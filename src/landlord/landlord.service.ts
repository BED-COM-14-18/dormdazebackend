import { Injectable,ConflictException } from '@nestjs/common';
import { UpdateLandlordDto } from './dto/updatelandlord.dto';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Landlord } from './entities/landlord.entity';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/auth/dto/LogIn.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ListingService } from 'src/listing/listing.service';

@Injectable()
export class LandlordService {

  constructor(
    @InjectRepository(Landlord)
    private landlordRepository: Repository<Landlord>,
    private jwtService: JwtService

  ){}

  async create(landlordDto: SignUpDto):Promise<{token : string}> {
    const name = (landlordDto.name);
    const {email,password} = landlordDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = this.landlordRepository.create({
      name: name,
      email: email,
      password: hashedPassword,

    })

    await this.landlordRepository.save(newOwner);

    const token = this.jwtService.sign({id: newOwner.id});

    return {token};
  
  }

  async validate(validateUser : LoginDto): Promise<{token: string}>{

    const {email,password} = validateUser;

    const user = await this.landlordRepository.findOne({where: {email}});

    if (!user)
      return null;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return null;
    
    const token = this.jwtService.sign({id: user.id});

    return {token};

  }

  async findOneByEmail(user : SignUpDto): Promise<boolean> {
    const { email } = user;
    const check = await this.landlordRepository.findOne({where:{email}})

    if (!check)
      return false;
    else
      return true;
    
  }

  async findOneById(id: number) {
    
    const user = await this.landlordRepository.findOne({ where: { id } });

    if (!user)
      return null;

    return user;

  }

  findAll() {
    return this.landlordRepository.find();
  }

  findOne(id: number) {
    return this.landlordRepository.findBy({id});
  }

  update(id: number, updatePropertyOwnerDto: UpdateLandlordDto) {
    return `This action updates a #${id} propertyOwner`;
  }

  remove(id: number) {
    return this.landlordRepository.delete(id);
  }
}
