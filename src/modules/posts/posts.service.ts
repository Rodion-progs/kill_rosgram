import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';
import { Like } from '../likes/likes.model';
import { UserModel } from '../users/models/user.model';

const LIMIT_POSTS_PAGINATION = 15;

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

    async create(user: UserModel, image): Promise<Post> {
        const filename = await this.fileService.createFile(image);
        const post = await this.postRepository.create({ userId: user.id, image: filename });
        return post;
    }

    async getAll(page: number): Promise<Post[]> {
        const posts = await this.postRepository.findAll({
            include: [{ model: Like, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            offset: page * LIMIT_POSTS_PAGINATION,
            limit: LIMIT_POSTS_PAGINATION,
        });
        return posts;
    }
}
