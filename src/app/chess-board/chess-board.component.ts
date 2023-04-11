import { HOST } from './../constants';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView} from 'ngx-chess-board';
import {  } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit, AfterViewInit {
  
  isPlayer1 : boolean = false; // player 1 is always white
  isDisabled : boolean = true;
  currentState: string = "";
  @ViewChild('board', {static: false}) board: NgxChessBoardView | undefined;

  constructor(private ngxChessBoardService: NgxChessBoardService, private route: ActivatedRoute) { 
    window.addEventListener(
      "message",
      (message) => {

        console.log("message received from " + (message.data.fromPlayer1 ? "player1" : "player2") + " inside " + (this.isPlayer1 ? "player1" : "player2"));
        if (message.data.fromPlayer1 == !this.isPlayer1) {
          this.board?.setFEN(message.data.event.fen);
          if(!this.isPlayer1)
            this.board?.reverse();
        }
      },
      false
    );  
  }

  ngAfterViewInit() {
    if (this.isPlayer1 == false) {
      setTimeout(() => {this.board?.reverse()}, 0);
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe( params => {
        this.isPlayer1 = params.player == 1
        this.isDisabled = !this.isPlayer1;
        console.log("isPlayer1 "+ this.isPlayer1)
      } 
    );
  }
  reset() {
    this.board?.reset();
  }

  moveChange(event:any) {

    window.parent.postMessage({
      event: event, 
      fromPlayer1 : this.isPlayer1
    }, location.origin);

    this.isDisabled = !this.isDisabled;
  }
}
