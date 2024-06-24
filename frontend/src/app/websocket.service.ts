import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Adjust the URL as needed
  }

  joinRoom(room: string) {
    this.socket.emit('join', room);
  }

  onOffer(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('offer', (data: any) => observer.next(data));
    });
  }

  sendOffer(room: string, offer: any) {
    this.socket.emit('offer', { room, offer });
  }

  onAnswer(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('answer', (data: any) => observer.next(data));
    });
  }

  sendAnswer(room: string, answer: any) {
    this.socket.emit('answer', { room, answer });
  }

  onCandidate(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('candidate', (data: any) => observer.next(data));
    });
  }

  sendCandidate(room: string, candidate: any) {
    this.socket.emit('candidate', { room, candidate });
  }

  onParticipantJoined(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('participantJoined', (data: any) => observer.next(data));
    });
  }
}
