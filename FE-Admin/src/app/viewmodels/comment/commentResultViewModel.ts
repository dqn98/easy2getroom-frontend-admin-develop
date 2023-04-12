import { UserResultViewModel } from '../user/userResultViewModel';

export class CommentResultViewModel {
    id: number;
    userId?: number;
    content: string;
    propertyId: number;
    parentId?: number;
    user: UserResultViewModel;
    childComments: CommentResultViewModel[];
    dateCreated: Date;
    dateModified: Date;
}