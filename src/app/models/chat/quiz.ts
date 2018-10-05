import {User} from './user';
import {Action} from './action';

export interface QuizChatModel {
    id?: string;
    courseId?: number;
    start?: boolean;
    name?: string;
    description?: string;
    from?: User;
    content?: any;
    action?: Action;
    correctAnswerCount?: number;
    created_by?: any;
    created_at?: any;
}
