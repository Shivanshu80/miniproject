import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service'
import { UserDto } from './user.dto';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('users')
    allUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Post('adduser')
    addUser(@Body() userDto: UserDto): Promise<User> {
        return this.authService.addUser(userDto);
    }

    // @Delete('removeuser')
    // removeUser(@Body() userEmail: User): User {
    //     return this.authService.removeUser(userEmail);
    // }

    // @Get('singleuser')
    // singleUser(@Body() user: User): User {
    //     return this.authService.singleUser(user);
    // }

    // @Put('updateuser')
    // updateUser(@Body() existsUser:User):User{
    //     return this.authService.updateUser(existsUser);
    // }

}