import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../users/models/user.model';
import { Like } from '../likes/likes.model';

interface PostCreationAttrs {
    userId: number;
    image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => UserModel)
    author: UserModel;

    @HasMany(() => Like)
    likes: Like[];
}
