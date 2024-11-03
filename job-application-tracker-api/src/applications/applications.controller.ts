import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApplicationDto } from './dto/application.dto';
import { ApiRequest } from 'src/shared/api-request';
import { Role } from 'src/shared/role';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('api/applications')
@UseGuards(AuthGuard)
@Controller('applications')
export class ApplicationsController {

    constructor(private readonly applicationService: ApplicationsService) { }

    @Get()
    @ApiOkResponse({
        description: 'list of user applications',
        type: [ApplicationDto]
    })
    async findAllUserApplications(@Request() request: ApiRequest) {
        if (!request.jwtPayLoad.roles.includes(Role.admin)) throw new BadRequestException('you are not allowed to get this user');
        return await this.applicationService.findAllUserApplications(request.jwtPayLoad.sub);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'applicationDto',
        type: ApplicationDto
    })
    async findOne(@Request() request: ApiRequest, @Param('id') id: string) {
        if (!request.jwtPayLoad.roles.includes(Role.admin) && request.jwtPayLoad.sub !== id) {
            throw new BadRequestException('you are not allowed to do this');
        }
        return await this.applicationService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'create new application' })
    @ApiCreatedResponse({
        description: 'applicationDto',
        type: ApplicationDto
    })
    async create(@Request() request: ApiRequest, @Body(ValidationPipe) createApplicationDto: CreateApplicationDto) {
        if (!request.jwtPayLoad.roles.includes(Role.admin) && request.jwtPayLoad.sub !== createApplicationDto.userId) throw new BadRequestException('user id doesnt match');
        return await this.applicationService.create(createApplicationDto);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'applicationDto',
        type: ApplicationDto
    })
    async update(
        @Request() request: ApiRequest,
        @Param('id') id: string,
        @Body(ValidationPipe) updateApplicationDto: UpdateApplicationDto
    ) {
        if (request.jwtPayLoad.sub !== updateApplicationDto.userId && !request.jwtPayLoad.roles.includes(Role.admin)) {
            throw new BadRequestException('id doesnt match');
        }
        return await this.applicationService.update(id, updateApplicationDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'ApplicationDto',
        type: ApplicationDto

    })
    async delete(@Request() request: ApiRequest,
        @Param('id') id: string) {
        const userId = (await this.applicationService.findOne(id)).userId;
        if (!request.jwtPayLoad.roles.includes(Role.admin) && request.jwtPayLoad.sub !== userId) {
            throw new BadRequestException('you are not allowed to delete this user');
        }
        return await this.applicationService.delete(id);
    }

}