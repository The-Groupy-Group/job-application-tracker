import { Role } from "./role";

export class JwtPayLoad {
    sub: number;
    email: string;
    roles: Role[];
}