import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../users/models/user.model';
import { Post } from '../posts/posts.model';
import { Like } from './likes.model';

@Module({
    providers: [LikesService],
    controllers: [LikesController],
    imports: [SequelizeModule.forFeature([UserModel, Post, Like])],
})
export class LikesModule {}
