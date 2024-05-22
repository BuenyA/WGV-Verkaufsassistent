import { AfterViewInit, Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  defaultMessage1: string[] = ["Hallo! Ich bin Ihr persönlicher Verkaufsassistent!"];
  defaultMessage2: string[] = ["Wie kann ich Ihnen heute weiterhelfen?"];
  buttonDisabled: boolean = true;

  constructor(public http: HttpClient) {}

  @ViewChild('containerRef', { read: ViewContainerRef }) container!: ViewContainerRef;
  componentRef!: ComponentRef<MessageComponent>;
  
  @ViewChild('chatArea') private chatArea: ElementRef;

  sendMessage(inputElement: HTMLInputElement) {
    const message = inputElement.value;
    if (message.trim()) {
      this.componentRef = this.container.createComponent(MessageComponent);
      this.componentRef.instance.messageArray = [message];
      inputElement.value = '';
      this.scrollToBottom();
      if(message == "Code: 300") {
        setTimeout(() => this.unlockButton(), 1000);
      } else if (message == "Code: 301") {
        setTimeout(() => this.lockButton(), 1000);
      } else {
        this.getBotMessage(message);
      }
    }
  }

  getBotMessage(message: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const json = {
            "userMessage": "" + message + "",
        };
        const body = JSON.stringify(json);
        console.log("JSON stringify body = " + body)
    
    this.http.post<any>('http://localhost:8080/api/v1/getBotMessage', body, { headers: headers, withCredentials: true }).subscribe({
      next: (data) => {
        console.log(data);
        console.log(data['botMessage']);
        this.setBotMessage(data['botMessage']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  
  setBotMessage(dynamicBotMessage: any) {
    this.componentRef = this.container.createComponent(MessageComponent);
    // this.componentRef.instance.message = dynamicBotMessage;
    this.componentRef.instance.messageArray = dynamicBotMessage;
    this.componentRef.instance.BoU = true;
    this.scrollToBottom();
  }

  scrollToBottom() {
    const element = this.chatArea.nativeElement;
    setTimeout(() => element.scrollTop = element.scrollHeight, 100);
  }

  newThread() {
    this.http.get<any[]>('http://localhost:8080/api/v1/createNewThread', { withCredentials: true }).subscribe(data => {
      console.log(data)
    })
    window.location.reload();
  }

  unlockButton() {
    this.buttonDisabled = false;
    this.setBotMessage("Button unlocked!");
  }

  lockButton() {
    this.buttonDisabled = true;
    this.setBotMessage("Button locked!");
  }
}