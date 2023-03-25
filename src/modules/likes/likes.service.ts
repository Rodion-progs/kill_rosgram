import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private readonly userLikesRepository: typeof Like) {}

    async addLike(postId: number, user: UserModel): Promise<void> {
        this.userLikesRepository.create({ postId: postId, userId: user.id });
    }

    async removeLike(postId: number, user: UserModel): Promise<boolean> {
        this.userLikesRepository.destroy({ where: { postId: postId, userId: user.id } });
        return true;
    }
}
