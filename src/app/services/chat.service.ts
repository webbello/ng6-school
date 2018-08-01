import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';

import { Message } from '../models/chat/message';
import { Event } from '../models/chat/event';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

	private url = 'http://localhost:3000';
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

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
	}
}
