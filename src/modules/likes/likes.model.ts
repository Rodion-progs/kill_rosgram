import { UserModel } from '../users/models/user.model';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../posts/posts.model';

interface LikeCreationAttrs {
    userId: number;
    postId: number;
}

@Table({ tableName: 'likes' })
export class Like extends Model<Like, LikeCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number;
}
