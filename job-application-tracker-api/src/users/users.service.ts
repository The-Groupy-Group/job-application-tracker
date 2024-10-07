import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users=[
        {
        "id":1,
        "name":"ido",
        "email":"ido98@gmail.com"
        },
        {
        "id":2,
        "name":"tomer",
        "email":"tomervak98@gmail.com"
        },
        {
        "id":3,
        "name":"donfil",
        "email":"bonfil98@gmail.com"
        }
    ]

    findALL(){
        return this.users;
    }

    findOne(id:number){
        const user =this.users.find(user=> user.id === id);
        return user;
    }

    creat(user : {name:string,email:string}){
        const userByHighestId = [...this.users].sort((a,b)=>b.id=a.id);
        const newUser={
            id:userByHighestId[0].id+1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id:number, updatedUser: {name?:string,email?:string}){
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
