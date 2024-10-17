import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { loginDto } from './dto/login-user.dto';
import { compare, hash } from 'bcrypt';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
    private users : User[] = [
        {
            "id": 1,
            "userName": "idoHashamen",
            "firstName": "ido",
            "lastName": "Rose",
            "email": "ido98@gmail.com",
            "passwordHash": "123456"
        },
        {
            "id": 2,
            "userName": "tomervak",
            "firstName": "tomer",
            "lastName": "vaknin",
            "email": "tomervak98@gmail.com",
            "passwordHash": "123456"
        },
        {
            "id": 3,
            "userName": "donfil",
            "firstName": "don",
            "lastName": "fil",
            "email": "bonfil98@gmail.com",
            "passwordHash": "123456"
        }
    ];

    userResponse(user :User) {
        return {id:user.id,
            userName: user.userName,
            firstName: user.firstName, 
            lastName: user.lastName,
            email:user.email
        };
    }
    findALL() {
        return this.users.map(user => this.userResponse(user));
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException('no such user');
        return this.userResponse(user);
    }

     async create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email:createUserDto.email,
            passwordHash:  await hash(createUserDto.password, 10)
        };
        this.users.push(newUser);
        return this.userResponse(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        this.users = await Promise.all(this.users.map(async user => {
            if (user.id === id) {
                return {id:updateUserDto.id,
                    userName: updateUserDto.userName,
                    firstName: updateUserDto.firstName, 
                    lastName: updateUserDto.lastName,
                    email:updateUserDto.email,
                    passwordHash: await hash(updateUserDto.password, 10)
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

    async login(loginDto : loginDto): Promise<User>{
        const user = await this.users.find(user => user.email===loginDto.email);
        if(!user){
            throw new HttpException('User not found',HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const isPasswordCorrect= await compare(loginDto.password,user.passwordHash);
        if(!isPasswordCorrect){
            throw new HttpException('Incorrect password',HttpStatus.UNPROCESSABLE_ENTITY); 
        }
        return user;
    }
}
