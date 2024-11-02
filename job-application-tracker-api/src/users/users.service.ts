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
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }


    async findALL() {
        const users = await this.userModel.find().exec();
        return users.map(user => UserMapper.toUserDto(user))

    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('no such user');
        return UserMapper.toUserDto(user);
    }

    async create(createUserDto: CreateUserDto) {
        
        const passwordHash = await hash(createUserDto.password, 10);

        const newUser = new this.userModel({
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            passwordHash: passwordHash,
            roles: [Role.user],
        });

        const savedUser = await newUser.save();
        return UserMapper.toUserDto(savedUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findById(id);
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
        const updatedUser = await user.save();
        return UserMapper.toUserDto(updatedUser);
    }

    async delete(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return UserMapper.toUserDto(deletedUser);
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const email =loginDto.email;
        const user = await this.userModel.findOne({email});
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
            roles: user.roles
        };
        const accessToken = await this.jwtService.signAsync(tokenPayLoad);
        let id: string = user.id;
        return new LoginResponse(id, accessToken);

    }
}
