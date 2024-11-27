import { Injectable, ConflictException} from '@nestjs/common';
//import { StudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { LoginDto } from 'src/auth/dto/LogIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class StudentService {
 
 constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private jwtService: JwtService
 
){}


  async create(createStudentDto: SignUpDto):Promise<{token:string}> {
    const name = (createStudentDto.name);
    const {email,password} = createStudentDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = this.studentRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    })

    await this.studentRepository.save(newStudent);

    const token = this.jwtService.sign({id: newStudent.id})
    
    return {token};
  }

  async validate(validateUser : LoginDto): Promise<{token: string}>{

    const {email,password} = validateUser;

    const user = await this.studentRepository.findOne({where: {email}});
    
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
    const check = await this.studentRepository.findOne({where: { email }})

    if (!check)
      return false;
    else
      return true;
    
  }

  async findOneById(id: number) {
    
    const student = await this.studentRepository.findOne({ where: { id } });


    if (!student)
      return null;

    return student;

  }

  
  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOneBy({id}) ;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
  
}
