import {User} from './user';
import {Action} from './action';

export interface Message {
    from?: User;
    content?: any;
    parent_id?: any;
    parent_message?: any;
    quizId?: string;
    lecture_id?: any;
    course_id?: any;
    action?: Action;
    created_at?: any;
}
