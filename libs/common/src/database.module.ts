import { Module } from '@nestjs/common';
import { CommonService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST as any,
      port: parseInt(process.env.DB_PORT as any),
      username: process.env.DB_USER as any,
      password: process.env.DB_PASSWORD as any,
      database: process.env.DB_DB as any,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true
    })
  ],
})
export class DatabaseModule {}
