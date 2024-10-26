import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { JwtPayLoad } from 'src/shared/jwt-payload';
import { Role } from 'src/shared/role';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user-mapper';

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JwtService,){}
    
    private users: User[] = [
        {
            "id": 1,
            "userName": "idoHashamen",
            "firstName": "ido",
            "lastName": "Rose",
            "email": "ido98@gmail.com",
            "passwordHash": "$2a$10$oY3pF8WCLCsBMYFpSeTM.uld80NhHAnX797aasFRZbL1s8hxDMbxS",
            "roles":[Role.user]
        },
        {
            "id": 2,
            "userName": "tomervak",
            "firstName": "tomer",
            "lastName": "vaknin",
            "email": "tomervak98@gmail.com",
            "passwordHash": "$2a$10$oY3pF8WCLCsBMYFpSeTM.uld80NhHAnX797aasFRZbL1s8hxDMbxS",
            "roles":[Role.user]
        },
        {
            "id": 3,
            "userName": "donfil",
            "firstName": "don",
            "lastName": "fil",
            "email": "bonfil98@gmail.com",
            "passwordHash": "$2a$10$oY3pF8WCLCsBMYFpSeTM.uld80NhHAnX797aasFRZbL1s8hxDMbxS",
            "roles":[Role.admin,Role.user]
        }
    ];

    findALL() {
        return this.users.map(user => UserMapper.toUserDto(user));
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException('no such user');
        return UserMapper.toUserDto(user);
    }

    async create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            passwordHash: await hash(createUserDto.password, 10),
            roles:[Role.user]

        };
        this.users.push(newUser);
        return UserMapper.toUserDto(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        this.users = await Promise.all(this.users.map(async user => {
            if (user.id === id) {
                return {
                    id: user.id,
                    userName: updateUserDto.userName,
                    firstName: updateUserDto.firstName,
                    lastName: updateUserDto.lastName,
                    email: updateUserDto.email,
                    passwordHash: await hash(updateUserDto.password, 10),
                    roles:user.roles
                };
            }
            return user;
        }));
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

    async login(loginDto: LoginDto): Promise<LoginResponse>{
        const user = await this.users.find(user => user.email === loginDto.email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPasswordCorrect = await compare(loginDto.password, user.passwordHash);
        if (!isPasswordCorrect) {
            throw new BadRequestException('Incorrect password');
        }
        const tokenPayLoad: JwtPayLoad = {
            sub: user.id,
            email: user.email,
            roles:user.roles
        };
        console.log(process.env.JWT_SECRET);
        const accessToken = await this.jwtService.signAsync(tokenPayLoad);
        let id : number=user.id;
        return new LoginResponse(id,accessToken);

    }
}
