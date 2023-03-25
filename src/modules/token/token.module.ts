import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [JwtService, TokenService],
    exports: [TokenService],
})
export class TokenModule {}
