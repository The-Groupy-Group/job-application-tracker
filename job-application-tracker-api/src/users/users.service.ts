import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { loginDto } from './dto/login-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    private users = [
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
    ]

    findALL() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException('no such user');
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto,
            passwordHash: hash(createUserDto.passwordHash, 10)
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...updateUserDto };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

    login(loginDto : loginDto){
        
    }
}
