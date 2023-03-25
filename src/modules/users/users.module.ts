import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { Like } from '../likes/likes.model';
import { Post } from '../posts/posts.model';
import { UsersController } from './users.controller';

@Module({
    imports: [SequelizeModule.forFeature([UserModel, Like, Post])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
