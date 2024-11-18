import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApplicationState } from "../applications-states/application-state.model";

@Schema()
export class Application  {
    _id:string;

    @Prop({required:true})
    companyName: string;

    @Prop({required:true})
    position: string;

    @Prop({required:true})
    states: ApplicationState[];

    @Prop({required:true})
    userId: string;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);