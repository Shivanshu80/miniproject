import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.find();
            console.log(users)
            return users
        } catch (error: any) {
            const message = {
                message: 'Somthing Wrong While To Find Users',
                error: error
            }
            throw new NotFoundException(message);
        }
    }

    async addUser(userDto: UserDto): Promise<User> {
        try {
            const existsUser = await this.userModel.create(userDto);
            return existsUser
        } catch (error: any) {
            const duplicateKey = 11000;
            const message = {
                message: 'User Already Exists'
            }
            if (error.code === duplicateKey) {
                throw new UnauthorizedException(message)
            } else {
                throw new NotFoundException(message);
            }
        }
    }

    // removeUser(userEmail: User): User {
    //     const existsUser = this.users.findIndex(user => user.email === userEmail.email);
    //     if (existsUser !== -1) {
    //         this.users.splice(existsUser, 1);
    //         return userEmail
    //     } else {
    //         throw new NotFoundException('User Not Found');
    //     }
    // }

    // singleUser(user: User): User {
    //     const existsUser = this.users.find(usr => usr.email === user.email);
    //     if (existsUser === undefined) {
    //         throw new NotFoundException('User Not Found');
    //     } else {
    //         return existsUser
    //     }
    // }

    // updateUser(existsUser:User):User{
    //     const alreadyUser = this.users.find(user => user.email === existsUser.email);
    //     if(alreadyUser === undefined){
    //         throw new NotFoundException('User Not Found');
    //     }else{
    //         const index = this.users.findIndex(user => user.email === existsUser.email);
    //         this.users[index] = existsUser
    //         return existsUser
    //     }
    // }
}