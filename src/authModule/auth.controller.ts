import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service'
import type { User } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('users')
    allUsers(): User[] {
        return this.authService.getUsers();
    }

    @Post('adduser')
    addUser(@Body() user: User): User {
        return this.authService.addUser(user);
    }

    @Delete('removeuser')
    removeUser(@Body() userEmail: User): User {
        return this.authService.removeUser(userEmail);
    }

    @Get('singleuser')
    singleUser(@Body() user: User): User {
        return this.authService.singleUser(user);
    }

    @Put('updateuser')
    updateUser(@Body() existsUser:User):User{
        return this.authService.updateUser(existsUser);
    }

}