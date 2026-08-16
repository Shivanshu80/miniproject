import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getUsers(): Promise<{ message: string; user: User[] }> {
        try {
            const users = await this.userModel.find();
            if (users.length === 0) {
                throw new NotFoundException('No Users Found');
            } else {
                const response = {
                    message: 'Users Fetched Successfully',
                    user: users
                }
                return response;
            }

        } catch (error: any) {
            const response = {
                message: 'No Users Found',
                error: error
            }
            throw new NotFoundException(response);
        }
    }

    async addUser(userDto: UserDto): Promise<{ message: string; user: User }> {
        try {
            const existsUser = await this.userModel.create(userDto);
            const response = {
                message: 'User Created Successfully',
                user: existsUser
            }
            return response;

        } catch (error: any) {
            const duplicateKey = 11000;
            const response = {
                message: 'User Already Exists With This Email',
                error: error
            }
            if (error.code === duplicateKey) {
                throw new UnauthorizedException(response)
            } else {
                throw new NotFoundException(response);
            }
        }
    }

    async removeUser(userEmail: UserDto): Promise<{ message: string; user: User }> {
        try {
            const existsUser = await this.userModel.findOneAndDelete({ email: userEmail.email });
            if (existsUser === null) {
                throw new NotFoundException('User Not Found');
            } else {
                const response = {
                    message: 'User Removed Successfully',
                    user: existsUser
                }
                return response;
            }
        } catch (error: any) {
            const response = {
                message: 'Somthing Wrong While To Remove User',
                error: error
            }
            throw new NotFoundException(response);
        }
    }

    async singleUser(user: UserDto): Promise<{ message: string; user: User }> {
        try {
            const existsUser = await this.userModel.findOne({ email: user.email });
            if (existsUser === null) {
                throw new NotFoundException('User Not Found');
            } else {
                const response = {
                    message: 'User Fetched Successfully',
                    user: existsUser
                }
                return response;
            }
        } catch (error: any) {
            const response = {
                message: 'User Not Found With This Email',
                error: error
            };
            throw new NotFoundException(response);
        }
    }

    async updateUser(existsUser: UserDto): Promise<{ message: string; user: User }> {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate({ email: existsUser.email },
                {
                    $set: {
                        name: existsUser.name,
                        password: existsUser.password,
                    },
                },
                { new: true });
            if (updatedUser === null) {
                throw new NotFoundException('User Not Found');
            }

            const response = {
                message: 'User Updated Successfully',
                user: updatedUser
            };
            return response;
        } catch (error: any) {
            const response = {
                message: 'User Not Found With This Email',
                error: error
            };
            throw new NotFoundException(response);
        }
    }
}