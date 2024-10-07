import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(){
        return this.usersService.findALL();
        }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user : {name:string,userName:string,firstName:string,lastName:string,email:string,password:string}){
        return this.usersService.creat(user);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body() userUpdate: {name?:string,userName?:string,firstName?:string,lastName?:string,email?:string,password?:string}){
        return this.usersService.update(id,userUpdate);
    }

    @Delete('id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.usersService.delete(id);
    }

}
