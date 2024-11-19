import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApplicationDto } from './dto/application.dto';
import { ApiRequest } from 'src/shared/api-request';
import { Role } from 'src/shared/role';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStateDto } from './applications-states/dto/application-state.dto';

@ApiTags('api/applications')
@UseGuards(AuthGuard)
@Controller('api/applications')
export class ApplicationsController {

    constructor(private readonly applicationService: ApplicationsService) { }

    @Get()
    @ApiOkResponse({
        description: 'list of user applications',
        type: [ApplicationDto]
    })
    async findAllUserApplications(@Request() request: ApiRequest) {
        return await this.applicationService.findAllUserApplications(request.jwtPayLoad.sub);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'applicationDto',
        type: ApplicationDto
    })
    async findOne(@Request() request: ApiRequest, @Param('id') id: string) {
        const appFound = await this.applicationService.findOne(id);
        if (!request.jwtPayLoad.roles.includes(Role.admin) && (request.jwtPayLoad.sub !== appFound.userId)) {
            throw new NotFoundException();
        }
        return appFound;
    }

    @Post()
    @ApiOperation({ summary: 'create new application' })
    @ApiCreatedResponse({
        description: 'applicationDto',
        type: ApplicationDto
    })
    async create(@Request() request: ApiRequest,
        @Body(ValidationPipe) createApplicationDto: CreateApplicationDto) {
        return await this.applicationService.create(createApplicationDto, request.jwtPayLoad.sub);
    }

    @Post(':applicationId/states')
    @ApiOperation({ summary: 'add new state ' })
    @ApiCreatedResponse({
        description: 'create state dto',
        type: ApplicationStateDto   
    })
    async createState(@Request() request: ApiRequest,
        @Param('applicationId') applicationId: string,
        @Body() newState: ApplicationStateDto
    ) {
        return await this.applicationService.createState(applicationId, newState, request.jwtPayLoad.sub);
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
        let isAdmin: boolean = request.jwtPayLoad.roles.includes(Role.admin);
        return await this.applicationService.update(id, updateApplicationDto, request.jwtPayLoad.sub, isAdmin);
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
            throw new NotFoundException();
        }
        return await this.applicationService.delete(id);
    }

}
