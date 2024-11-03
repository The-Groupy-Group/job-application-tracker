import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Application  {
    _id:string;

    @Prop({required:true})
    companyName: string;

    @Prop({required:true})
    position: string;

    @Prop({required:true})
    states: any[];

    @Prop({required:true})
    userId: string;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);