import { GameState } from './../GameState';
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

  @ViewChild('board', {static: false}) board: NgxChessBoardView | undefined;

  constructor(private ngxChessBoardService: NgxChessBoardService, private route: ActivatedRoute) { 
    window.addEventListener(
      "message",
      (message) => {
        if (message.data.order == 'setState') {
          let newState : GameState = message.data.newState;
          this.board?.setFEN(newState.fen);
          if(!this.isPlayer1)
            this.board?.reverse();
        }
      },
      false
    );  
  }

  ngAfterViewInit() {
    if (this.isPlayer1 == false) {
      setTimeout(() => { this.board?.reverse() }, 0);
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe( params => {
        console.log(params);
        this.isPlayer1 = params.player == 1
        console.log("isPlayer1 "+ this.isPlayer1)
      } 
    );
  }
  reset() {
    this.board?.reset();
  }

  moveChange(event:any) {
    console.log("fromPlayer1? " + this.isPlayer1);
    window.parent.postMessage({
      event: event, 
      fromPlayer1 : this.isPlayer1
    }, location.origin);

    if (event.checkmate) {
      window.alert((this.isPlayer1? "Player 1" : "Player 2") + " wins!");
    }
    if (event.stalemate) {
      window.alert("Draw!");
    }
  }
}
