import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users=[
        {
        "id":1,
        "userName":"idoHashamen",
        "firstName":"ido",
        "lastName":"Rose",
        "email":"ido98@gmail.com",
        "password":"123456"

        },
        {
        "id":2,
        "userName":"tomervak",
        "firstName":"tomer",
        "lastName":"vaknin",
        "email":"tomervak98@gmail.com",
        "password":"123456"
        },
        {
        "id":3,
        "userName":"donfil",
        "firstName":"don",
        "lastName":"fil",
        "email":"bonfil98@gmail.com",
        "password":"123456"
        }
    ]

    findALL(){
        return this.users;
    }

    findOne(id:number){
        const user =this.users.find(user=> user.id === id);
        return user;
    }

    creat(user : {name:string,userName:string,firstName:string,lastName:string,email:string,password:string}){
        const userByHighestId = [...this.users].sort((a,b)=>b.id-a.id);
        const newUser={
            id:userByHighestId[0].id+1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id:number, updatedUser: {name?:string,userName?:string,firstName?:string,lastName?:string,email?:string,password?:string}){
        this.users = this.users.map(user =>{
            if(user.id === id){
                return{...user,...updatedUser};
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id:number){
        const removedUser=this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
