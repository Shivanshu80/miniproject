import { Controller, Get, Post, Body } from '@nestjs/common';
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
}