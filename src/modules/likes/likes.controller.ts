import { Body, Controller, Delete, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtGuard } from '../../guards/jwt-guard';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {
    }

    @Post()
    @UseGuards(JwtGuard)
    addLike(@Body('postId') postId: number, @Req() request) {
        const user = request.user;
        this.likesService.addLike(postId, user);
    }

    @Delete()
    @UseGuards(JwtGuard)
    removeLike(@Query('postId') postId: number, @Req() request) {
        const user = request.user;
        this.likesService.removeLike(postId, user);
    }
}
