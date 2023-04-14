import { Router } from '@angular/router';
import { INITIAL_FEN_STATE } from './../../constants';
import { GameState } from 'src/app/GameState';
import { OnlineGameplayService } from './../../online-gameplay.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [ OnlineGameplayService ]
})
export class HomePageComponent implements OnInit {

  constructor(private onlineGameplayService : OnlineGameplayService, private router:Router) { }

  ngOnInit(): void {
  }

  joinOnlineGame() {
    let roomID = window.prompt("Enter the room code: ");
    if(roomID != null)
      this.router.navigateByUrl('online/game?player=2&room='+roomID);
  }
  newOnlineGame() {
    this.onlineGameplayService.createRoom(new GameState(INITIAL_FEN_STATE, true, false, false))
    .then((key)=> {
      window.alert("Room Code is: "+ key);
      this.router.navigateByUrl('online/game?player=1&room='+key);
    })
    .catch((err) => {
      console.log("Failed to create room "+ err);
    });
  } 
}
