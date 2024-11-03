import { Role } from "./role";

export class JwtPayLoad {
    sub: string;
    email: string;
    roles: Role[];
}