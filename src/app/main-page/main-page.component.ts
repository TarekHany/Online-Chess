import { HOST } from './../constants';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor() {
    window.addEventListener("message", this.handleMessage, false);
  }
  handleMessage(message:any) {
    console.log("inside mainpage message origin: "+ message.origin);
    let receiverID = message.data.fromPlayer1 ? "player2":"player1";
    document.querySelectorAll('iframe').forEach( (iframe) => {
      if(iframe.id === receiverID) {
        iframe.style.pointerEvents = "all";
        iframe.contentWindow?.postMessage(message.data, location.origin) 
      } else {
        iframe.style.pointerEvents = "none";
      }
    });
  }
  
  
}
