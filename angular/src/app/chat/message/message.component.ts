import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() BoU: boolean;
  @Input() messageArray: string[];

  message: string = '';
  currentWordIndex: number = 0;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.streamMessage();
  }

  streamMessage() {
    if (this.currentWordIndex < this.messageArray.length) {
      this.message += '' + this.messageArray[this.currentWordIndex];
      this.currentWordIndex++;
      this.chatService.triggerFunctionCall();
      setTimeout(() => this.streamMessage(), 30);
    } else {
      this.chatService.triggerFunctionCall();
    }
  }
}