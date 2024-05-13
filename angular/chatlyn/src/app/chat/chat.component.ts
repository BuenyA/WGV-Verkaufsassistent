import { Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  defaultMessage1: string = "Hallo! Ich bin Ihr persönlicher Beratungsassistent!";
  defaultMessage2: string = "Wie kann ich Ihnen heute weiterhelfen?";

  constructor(public http: HttpClient) {}

  @ViewChild('containerRef', { read: ViewContainerRef }) container!: ViewContainerRef;
  componentRef!: ComponentRef<MessageComponent>;
  
  @ViewChild('chatArea') private chatArea: ElementRef;

  sendMessage(inputElement: HTMLInputElement) {
    const message = inputElement.value;
    if (message.trim()) {
      this.componentRef = this.container.createComponent(MessageComponent);
      this.componentRef.instance.message = message;
      inputElement.value = '';
      this.scrollToBottom();
      this.getBotMessage(message);
    }
  }

  getBotMessage(message: string) {
    const headers = { 'content-type': 'application/json' }
        const json = {
            "userMessage": "" + message + "",
        };
        const body = JSON.stringify(json);
        console.log("JSON strngify body = " + body)

    this.http.post<any>('http://localhost:8080/api/v1/getBotMessage', body, { headers: headers, withCredentials: true }).subscribe({
      next: (data) => {
        console.log(data);
        // this.setBotMessage(data['botMessage']);
        setTimeout(() => this.setBotMessage(data['botMessage']), 1500);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  setBotMessage(dynamicBotMessage: string) {
    this.componentRef = this.container.createComponent(MessageComponent);
    this.componentRef.instance.message = dynamicBotMessage;
    this.componentRef.instance.BoU = true;
    this.scrollToBottom();
  }

  scrollToBottom() {
    const element = this.chatArea.nativeElement;
    setTimeout(() => element.scrollTop = element.scrollHeight, 100);
  }
}