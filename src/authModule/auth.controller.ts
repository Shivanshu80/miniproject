import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service'
import { UserDto } from './user.dto';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('users')
    allUsers(): Promise<{ message: string, user: User[] }> {
        return this.authService.getUsers();
    }

    @Post('adduser')
    addUser(@Body() userDto: UserDto): Promise<{ message: string, user: User }> {
        return this.authService.addUser(userDto);
    }

    @Delete('removeuser')
    removeUser(@Body() userEmail: UserDto): Promise<{ message: string, user: User }> {
        return this.authService.removeUser(userEmail);
    }

    @Get('singleuser')
    singleUser(@Body() user: User): Promise<{ message: string, user: User }> {
        return this.authService.singleUser(user);
    }

    @Put('updateuser')
    updateUser(@Body() existsUser:UserDto):Promise<{message:string;user:User}>{
        return this.authService.updateUser(existsUser);
    }

}