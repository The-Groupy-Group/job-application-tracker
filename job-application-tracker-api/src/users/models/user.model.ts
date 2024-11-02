import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/shared/role";

@Schema()
export class User  {
    _id:string;

    @Prop({required:true})
    userName: string;

    @Prop({required:true})
    firstName: string;

    @Prop({required:true})
    lastName: string;

    @Prop({required:true, unique: true})
    email: string;

    @Prop({required:true})
    passwordHash: string;

    @Prop({required:true})
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);