import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayLoad } from "src/shared/jwt-payload";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayLoad: JwtPayLoad = await this.jwtService.verifyAsync(token);
            request.jwtPayLoad = tokenPayLoad;
            return true;
        }
        catch (error) {
            throw new UnauthorizedException();
        }
    }
}