import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service'
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Get('getusers')
    allUsers() {
        return this.authService.getUsers();
    }

    @Post('adduser')
    addUser(@Body() userDto: UserDto) {
        return this.authService.addUser(userDto)
    }

    @Delete('removeuser')
    removeUser(@Body() userEmail: UserDto) {
        return this.authService.removeUser(userEmail);
    }

    @Get('singleuser')
    singleUser(@Body() user: UserDto) {
        return this.authService.singleUser(user);
    }

    @Put('updateuser')
    updateUser(@Body() existsUser: UserDto) {
        return this.authService.updateUser(existsUser);
    }

}