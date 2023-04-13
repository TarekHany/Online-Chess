import { RouterModule } from '@angular/router';
import { GameState } from './GameState';
import { child, get, getDatabase, onValue } from 'firebase/database';
import { firebaseConfig } from './../environments/environment';
import { initializeApp } from 'firebase/app';
import { Database , set, ref, push} from 'firebase/database';
import { Injectable } from '@angular/core';
import { GamePageComponent } from './online/game-page/game-page.component';

@Injectable({
  providedIn: 'root'
})
export class OnlineGameplayService {

  private db: Database;
  
  constructor() { 
    let app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  createRoom(state: GameState) : Promise < string | null > {
    
    let key = push(ref(this.db, 'rooms' ), state)
    .then((ref) => {
      return ref.key;
    })
    .catch((err) => {
      console.log("Failed to create a room. ", err);
      return null;
    });
    return key;
  }
  getState(roomID: string) : Promise<GameState | null> {
    
    let val = get(ref(this.db, 'rooms/'+roomID))
    .then((snapshot) => {
      console.log(snapshot.val())
      return snapshot.val();
    })
    .catch((err)=> {
      console.log("failed to retrieve room with ID: "+roomID)
      return null;
    })
    return val;
  }

  saveState(roomID: string, newState: GameState) {
    set(ref(this.db, 'rooms/' + roomID), newState)
    .then(() => {
      console.log("saved successfully");
      console.log(newState);
    })
    .catch((err) => {
      console.log("Failed to save state: ", err); 
    });
  }

  listenOnChanges(roomID:string, gamePageComponent : GamePageComponent) {
    onValue(ref(this.db, 'rooms/'+roomID), (snapshot) => {
      gamePageComponent.setState(snapshot.val()); 
    })
  }
}
