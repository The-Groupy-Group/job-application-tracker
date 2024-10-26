import { Role } from "src/shared/role";

export class User {
    id: number;

    userName: string;

    firstName: string;

    lastName: string;

    email: string;

    passwordHash: string;

    roles: Role[];
}