import { Injectable, UnauthorizedException } from '@nestjs/common'

export interface User {
    name: string;
    email: string;
    password: string;
}

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
            this.users.push(user)
            return user
        } else {
            throw new UnauthorizedException('User Already Exists');
        }

    }

}