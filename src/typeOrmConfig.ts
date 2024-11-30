import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dorm_user',
    password: 'dorm_pass100',
    database: 'dormdaze',
    autoLoadEntities: true,     
    synchronize: true,          
  };