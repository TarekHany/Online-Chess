import { OnlineGameplayService } from './online-gameplay.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from "ngx-chess-board";
import { HomePageComponent } from './online/home-page/home-page.component';
import { GamePageComponent } from './online/game-page/game-page.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChessBoardComponent,
    HomePageComponent,
    GamePageComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  providers: [OnlineGameplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
