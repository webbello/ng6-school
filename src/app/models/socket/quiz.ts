import {User} from '../chat/user';
import {Action} from '../chat/action';

export interface QuizResultModel {
    id?: string;
    name?: string;
    description?: string;
    from?: User;
    content?: any;
    action?: Action;
    correctAnswerCount?: number;
    created_by?: any;
    created_at?: any;
}