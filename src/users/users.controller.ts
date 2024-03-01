import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
constructor(private readonly userService:UsersService){}

    
    @Get(':id')
    async findOne(@Param('id') id:number): Promise<User>{
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new Error('user not found');
        } else {
            return user;
        }
    }

    @Post()
    async create(@Body() user: User): Promise<User>{
        return await this.userService.create(user);
    }
    @Put('id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User>{
        return await this.userService.update(id, user)
        
        
    }
    @Delete('id')
    async delete(@Param('id') id: number): Promise<User>{
        return await this.userService.delete(id)
            
    }
    @Get()
    async findAll(): Promise<User[]>{
        return await this.userService.findAll();
    }
}
