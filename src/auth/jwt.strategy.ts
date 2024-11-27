import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
import { LandlordService } from 'src/landlord/landlord.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly agentService: AdminService,
    private readonly onwerService: LandlordService,
    private readonly studentService: StudentService    
){
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ifindSecret',
    });

  }

  async validate(payload) {

    let user

    user = await this.onwerService.findOneById(payload.id);
    if (user) 
        return { id: user.id, role: user.role };

    user = await this.agentService.findOneById(payload.id);
    if (user) 
        return { id: user.id, role: user.role };

    user = await this.studentService.findOneById(payload.id);
    if (user) 
        return { id: user.id, role: user.role };

    
    throw new UnauthorizedException('Login first to access the resource.');


  }

}