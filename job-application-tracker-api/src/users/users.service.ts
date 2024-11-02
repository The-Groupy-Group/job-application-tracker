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
import { UserMapper } from './user-mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) { }


    async findALL() {
        const users = await this.userRepository.findAll();
        return users.map(user => UserMapper.toUserDto(user))

    }

    async findOne(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('no such user');
        return UserMapper.toUserDto(user);
    }

    async create(createUserDto: CreateUserDto) {

        const passwordHash = await hash(createUserDto.password, 10);

        const newUser = {
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            passwordHash: passwordHash,
            roles: [Role.user],
        };

        const savedUser = await this.userRepository.create(newUser);
        return UserMapper.toUserDto(savedUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.userName = updateUserDto.userName;
        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;
        user.email = updateUserDto.email;
        if (updateUserDto.password) {
            user.passwordHash = await hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.userRepository.update(id,user);
        return UserMapper.toUserDto(updatedUser);
    }

    async delete(id: string) {
        const deletedUser = await this.userRepository.delete(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return UserMapper.toUserDto(deletedUser);
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPasswordCorrect = await compare(loginDto.password, user.passwordHash);
        if (!isPasswordCorrect) {
            throw new BadRequestException('Incorrect password');
        }

        const tokenPayLoad: JwtPayLoad = {
            sub: user._id,
            email: user.email,
            roles: user.roles
        };
        const accessToken = await this.jwtService.signAsync(tokenPayLoad);
        let id: string = user._id;
        return new LoginResponse(id, accessToken);

    }
}
