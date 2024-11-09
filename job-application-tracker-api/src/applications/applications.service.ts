import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { UsersService } from 'src/users/users.service';
import { ApplicationMapper } from './application-mapper';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
    constructor(private readonly applicationRepository: ApplicationRepository,
        private readonly userService: UsersService
    ) { }

    async findAllUserApplications(userId: string) {
        try {
            this.userService.findOne(userId);
        }
        catch {
            throw new NotFoundException('no such user');
        }
        return this.applicationRepository.findAllByUserId(userId);
    }

    async findOne(applicationId: string) {
        const application = await this.applicationRepository.findById(applicationId);
        if (!application) throw new NotFoundException(' no such application');
        return ApplicationMapper.toApplicationDto(application);
    }

    async create(createApplicationDto: CreateApplicationDto) {
        try {
            this.userService.findOne(createApplicationDto.userId);
        }
        catch {
            throw new NotFoundException('no such user');
        }

        const newApplication : CreateApplicationDto = {
            companyName: createApplicationDto.companyName,
            position: createApplicationDto.position,
            states: createApplicationDto.states,
            userId: createApplicationDto.userId
        };

        const savedApplication = await this.applicationRepository.create(newApplication);
        return ApplicationMapper.toApplicationDto(savedApplication);

    }
    async update(id: string, updateApplicationDto: UpdateApplicationDto) {
        const application = await this.applicationRepository.findById(id);
        if (!application) throw new NotFoundException('no such application');
        application.companyName = updateApplicationDto.companyName;
        application.position = updateApplicationDto.position;
        application.states = updateApplicationDto.states;
        if (updateApplicationDto.userId && (updateApplicationDto.userId !== application.userId)) throw new BadRequestException('cant change user ownership of application');
        const updateApplication = await this.applicationRepository.update(id, application);
        return ApplicationMapper.toApplicationDto(updateApplication);
    }

    async delete(id: string) {
        const deletedApplication = await this.applicationRepository.delete(id);
        if (!deletedApplication) throw new NotFoundException('no such application');
        return ApplicationMapper.toApplicationDto(deletedApplication);
    }
}