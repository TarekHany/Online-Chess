import { GameState } from './../GameState';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgxChessBoardView} from 'ngx-chess-board';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit, AfterViewInit {
  
  isPlayer1 : boolean = false; // player 1 is always white

  @ViewChild('board', {static: false}) board: NgxChessBoardView | undefined;

  constructor(private route: ActivatedRoute) { 
    window.addEventListener(
      "message",
      (message) => {
        if(message.origin != window.location.origin)
          return;
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
        this.isPlayer1 = params.player == 1
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
  }
}
