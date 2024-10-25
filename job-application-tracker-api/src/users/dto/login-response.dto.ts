export class LoginResponse{
    userId: number;
    accessToken: string;

    constructor(userId:number, accessToken: string){
        this.userId=userId;
        this.accessToken=accessToken;
    }
}
