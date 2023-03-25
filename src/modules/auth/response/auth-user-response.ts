import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;
}

export class AuthUserResponse {
    @ApiProperty()
    user: UserResponse;

    @ApiProperty()
    @IsString()
    token: string;
}
