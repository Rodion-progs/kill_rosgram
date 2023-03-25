import { UserModel } from '../../users/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class PostResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    image: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    author: UserModel;

    @ApiProperty()
    likes: number;

    @ApiProperty()
    liked: boolean;
}
