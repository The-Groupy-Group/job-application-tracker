import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    accessToken: string;

    constructor(userId: number, accessToken: string) {
        this.userId = userId;
        this.accessToken = accessToken;
    }
}
