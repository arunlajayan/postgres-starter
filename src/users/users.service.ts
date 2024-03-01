import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ) { }
    
    async findAll(): Promise<User[]>{
        return await this.UserRepository.find()
    }

    async findOne(id:number): Promise<User>{
        return await this.UserRepository.findOne({where:{id}})
    }

    async create(user:User): Promise<User>{
        const newUser = this.UserRepository.create(user);
        
        return await this.UserRepository.save(newUser);
    }

    async update(id:number,user:User): Promise<User>{
        await this.UserRepository.update(id, user);
        return await this.UserRepository.findOne({where:{id}});
    }

    async delete(id:number): Promise<User>{
      const user = this.UserRepository.findOne({where:{id}})
        await this.UserRepository.delete(id);
        if (!user) {
            throw new Error('user not found');

        } else {
            return user;
        }
    }
}
