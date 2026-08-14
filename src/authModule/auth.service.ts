import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

export interface User {
    name: string;
    email: string;
    password: string;
}
// return type of the function is User[] because we are returning an array of users.

@Injectable()
export class AuthService {
    private readonly users: User[] = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'john@123'
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: 'jane@123'
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            password: 'alice@123'
        }
    ]

    getUsers(): User[] {
        return this.users
    }

    addUser(user: User): User {
        const existsUser = this.users.find(usr => usr.email === user.email)
        if (existsUser === undefined) {
            this.users.push(user);
            return user
        } else {
            throw new UnauthorizedException('User Already Exists');
        }
    }

    removeUser(userEmail: User): User {
        const existsUser = this.users.findIndex(user => user.email === userEmail.email);
        if (existsUser !== -1) {
            this.users.splice(existsUser, 1);
            return userEmail
        } else {
            throw new NotFoundException('User Not Found');
        }
    }

    singleUser(user: User): User {
        const existsUser = this.users.find(usr => usr.email === user.email);
        if (existsUser === undefined) {
            throw new NotFoundException('User Not Found');
        } else {
            return existsUser
        }
    }

    updateUser(existsUser:User):User{
        const alreadyUser = this.users.find(user => user.email === existsUser.email);
        if(alreadyUser === undefined){
            throw new NotFoundException('User Not Found');
        }else{
            const index = this.users.findIndex(user => user.email === existsUser.email);
            this.users[index] = existsUser
            return existsUser
        }
    }
}