import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    accessToken: string;

    constructor(userId: string, accessToken: string) {
        this.userId = userId;
        this.accessToken = accessToken;
    }
}
