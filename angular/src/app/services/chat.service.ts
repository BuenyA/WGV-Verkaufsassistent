import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private callFunctionSubject = new Subject<void>();
  callFunction$ = this.callFunctionSubject.asObservable();

  triggerFunctionCall() {
    this.callFunctionSubject.next();
  }
}