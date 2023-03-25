import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Like } from '../../likes/likes.model';
import { Post } from '../../posts/posts.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
    @Column
    firstName: string;

    @Column
    userName: string;

    @Column
    email: string;

    @Column
    password: string;

    @HasMany(() => Like, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    likes: Like[];

    @HasMany(() => Post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    posts: Post[];
}
