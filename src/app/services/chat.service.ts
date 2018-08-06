import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';

import { Message } from '../models/chat/message';
import { Event } from '../models/chat/event';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

	private url = 'http://192.168.17.35:3000';
    private socket;    

    constructor() {
	    this.socket = io(this.url);
	}

	public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onStart(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('startQuiz', (data: {start: true}) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
	}
}
