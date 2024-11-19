import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { UsersService } from 'src/users/users.service';
import { ApplicationMapper } from './application-mapper';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationState } from './applications-states/model/application-state.model';
import { Application } from './models/application.model';

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

    async create(createApplicationDto: CreateApplicationDto, userId: string) {
        try {
            await this.userService.findOne(userId);
        }
        catch {
            throw new NotFoundException('no such user');
        }

        const newApplication = {
            companyName: createApplicationDto.companyName,
            position: createApplicationDto.position,
            states: [{
                title: "Applied",
                description: "You have applied to this position",
                dueDate: new Date(),
            }],
            userId: userId
        }

        const savedApplication = await this.applicationRepository.create(newApplication);
        return ApplicationMapper.toApplicationDto(savedApplication);

    }
    async update(id: string, updateApplicationDto: UpdateApplicationDto, userId: string, isAdmin: boolean) {
        const application = await this.applicationRepository.findById(id);
        if (!application || (!(application.userId !== userId) && !isAdmin)) throw new NotFoundException('no such application');
        application.companyName = updateApplicationDto.companyName;
        application.position = updateApplicationDto.position;
        const updateApplication = await this.applicationRepository.update(id, application);
        return ApplicationMapper.toApplicationDto(updateApplication);
    }

    async delete(id: string) {
        const deletedApplication = await this.applicationRepository.delete(id);
        if (!deletedApplication) throw new NotFoundException('no such application');
        return ApplicationMapper.toApplicationDto(deletedApplication);
    }

    async createState(appId: string, newState: ApplicationState, userId: string) {
        const application: Application = await this.applicationRepository.findById(appId);
        if (!application || application.userId !== userId) {
            throw new NotFoundException('no such application');
        }
        application.states.push(newState);
        const updateApplication = await this.applicationRepository.update(appId, application);
        return ApplicationMapper.toApplicationDto(updateApplication);
    }
}
