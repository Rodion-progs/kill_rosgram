import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response/auth-user-response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiResponse({ status: 201, type: CreateUserDto })
    @Post('register')
    register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
        return this.authService.registerUser(dto);
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: AuthUserResponse })
    @Post('login')
    login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto);
    }
}
