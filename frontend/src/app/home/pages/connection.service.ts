import { Injectable } from '@angular/core';
import { Socket } from './socket.model';
import { Observer, Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

declare var io: {
    connect(url: string): Socket
};

@Injectable()
export class ConnectionService {

    socket: Socket;
    observer: Observer<string>;

    getConnectionUsername(): Observable<string> {
        this.socket = socketIo('http://localhost:8000');

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
