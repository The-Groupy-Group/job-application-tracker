import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './models/application.model';

@Injectable()
export class ApplicationRepository {
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) { }

  async create(application: Partial<Application>): Promise<Application> {
    const newUser = new this.applicationModel({application,states:[]});
    return newUser.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Application[]> {
    return this.applicationModel.find({ userId }).exec();
  }

  async findById(id: string): Promise<Application | null> {
    return this.applicationModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Application>): Promise<Application | null> {
    return this.applicationModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Application | null> {
    return this.applicationModel.findByIdAndDelete(id).exec();
  }
}
