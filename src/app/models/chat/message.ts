import {User} from './user';
import {Action} from './action';

export interface Message {
    from?: User;
    content?: any;
    quizId?: string;
    action?: Action;
    created_at?: any;
}
