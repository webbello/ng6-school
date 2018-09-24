import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { Message } from '../models/chat/message';
import { QuizChatModel } from '../models/chat/quiz';
import { QuizResultModel } from '../models/socket/quiz';
import { Event } from '../models/chat/event';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

	private url = environment.apiUrl;
    private socket;    

    constructor() {
	    this.socket = io(this.url);
	}

	public send(message: Message): void {
        this.socket.emit('message', message);
    }
    public startQuiz(quiz: QuizChatModel): void {
        this.socket.emit('quiz', quiz);
    }

    public submitQuiz(quizResult: QuizResultModel): void {
        this.socket.emit('quizResult', quizResult);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onQuizStart(): Observable<QuizChatModel> {
        return new Observable<QuizChatModel>(observer => {
            this.socket.on('quiz', (data: QuizChatModel) => observer.next(data));
        });
    }

    public onQuizSubmit(): Observable<QuizResultModel> {
        return new Observable<QuizResultModel>(observer => {
            this.socket.on('quizResult', (data: QuizResultModel) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
	}
}
