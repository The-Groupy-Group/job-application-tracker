import {
    Body, Controller, Delete, Get, Param, Post,
    ParseIntPipe, ValidationPipe,
    Put, UseGuards, Request,
    BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiRequest } from 'src/shared/api-request';
import { Role } from 'src/shared/role';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('api/users')
@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() request: ApiRequest) {
        if (!request.jwtPayLoad.roles.includes(Role.admin)) {
            throw new BadRequestException('only admin can get all users');
        }
        return this.usersService.findALL();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Request() request: ApiRequest, @Param('id', ParseIntPipe) id: number) {
        if (!request.jwtPayLoad.roles.includes(Role.admin) && request.jwtPayLoad.sub !== id) {
            throw new BadRequestException('you are not allowed to get this user (fu)');
        }
        return this.usersService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'craete new user',
        type:CreateUserDto,
    })
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'login into existing user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        const loginResponse = await this.usersService.login(loginDto);
        return loginResponse;
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Request() request: ApiRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto
    ) {
        if (request.jwtPayLoad.sub !== id && !request.jwtPayLoad.roles.includes(Role.admin)) {
            throw new BadRequestException('id doesnt match');
        }
        return this.usersService.update(id, updateUserDto);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Request() request: ApiRequest,
        @Param('id', ParseIntPipe) id: number) {
        if (!request.jwtPayLoad.roles.includes(Role.admin) && request.jwtPayLoad.sub !== id) {
            throw new BadRequestException('you are not allowed to delete this user');
        }
        return this.usersService.delete(id);
    }

}


