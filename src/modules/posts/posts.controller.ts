import { Req, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Post as PostModel } from './posts.model';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../../guards/jwt-guard';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createPost(@UploadedFile() image, @Req() request) {
        const user = request.user;
        const post = await this.postService.create(user, image);
        return post;
    }

    @Get()
    async getAll(@Query('page') page: number): Promise<PostModel[]> {
        const posts = this.postService.getAll(page);
        return posts;
    }
}
