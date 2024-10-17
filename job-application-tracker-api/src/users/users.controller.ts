import { Body, Controller, Delete, Get, Param, Patch, Post, 
    ParseIntPipe, ValidationPipe,
    Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login-user.dto';

@Controller('api/users')
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
    create(@Body(ValidationPipe) createUserDto : CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    /*@Post('login')
    async login(@Body() loginDto:loginDto) : Promise<any>{
        const user = await this.usersService.loginUser(loginDto);
    }*/

    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number,@Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.update(id,updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.usersService.delete(id);
    }

}
