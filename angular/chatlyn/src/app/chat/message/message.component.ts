import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { ChatComponent } from '../chat.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() BoU: boolean; // Bot = True, User = False
  @Input() messageArray: string[];
  
  message: string = '';
  currentWordIndex: number = 0;

  ngOnInit() {
    this.streamMessage();
  }

  streamMessage() {
    if (this.currentWordIndex < this.messageArray.length) {
      this.message += '' + this.messageArray[this.currentWordIndex];
      this.currentWordIndex++;
      setTimeout(() => this.streamMessage(), 30);
    }
  }
}