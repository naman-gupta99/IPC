import { Injectable } from '@angular/core';
import { Socket } from './socket.model';
import { Observer, Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

@Injectable()
export class ConnectionService {

    socket: Socket;
    observer: Observer<string>;

    getConnectionUsername(username: string): Observable<string> {
        this.socket = socketIo('http://localhost:8000/?u=' + username);
        console.log(this.socket);
        this.socket.on('connected', (res) => {
            this.observer.next(res);
        });

        return this.createObservable();
    }

    createObservable(): Observable<string> {
        return new Observable(observer => {
            this.observer = observer;
        });
    }
}
