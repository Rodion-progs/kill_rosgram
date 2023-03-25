import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt-guard';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    @UseGuards(JwtGuard)
    async getUser(@Req() request): Promise<UserModel> {
        const user = await this.usersService.publicUser(request.user.email);
        return user;
    }
}
