import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './modules/users/models/user.model';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { Post } from './modules/posts/posts.model';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LikesModule } from './modules/likes/likes.module';
import * as path from 'path';
import { Like } from './modules/likes/likes.model';
import { TokenModule } from './modules/token/token.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'modules/static'),
        }),
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [UserModel, Post, Like],
                synchronize: true,
                autoLoadModels: true,
            }),
        }),
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule,
        LikesModule,
        TokenModule,
    ],
})
export class AppModule {}
