import {User} from './user';
import {Action} from './action';

export interface QuizChatModel {
    id?: string;
    start?: boolean;
    name?: string;
    description?: string;
    from?: User;
    content?: any;
    action?: Action;
    created_by?: any;
    created_at?: any;
}
