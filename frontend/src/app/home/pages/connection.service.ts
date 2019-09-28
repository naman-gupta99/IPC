import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

@Injectable()
export class ConnectionService {

    socket;
    requestConnection = 0;
    observer: Observer<string>;

    getConnectionUsername(username: string): Observable<string> {
        this.socket = socketIo('http://localhost:8000/?u=' + username);
        console.log(this.socket);
        this.socket.on('connected', (res) => {
            console.log('connect - ' + res);
            this.requestConnection = 1;
            this.observer.next(res);
        });
        this.socket.on('requested', (res) => {
            console.log('requested - ' + res);
            this.requestConnection = 0;
            this.observer.next(res);
        });
        this.socket.on('disconnected', (res) => {
            console.log('disconnected - ' + res);
            this.requestConnection = 2;
            this.observer.next(res);
        });

        return new Observable(observer => {
            this.observer = observer;
        });
    }
}
