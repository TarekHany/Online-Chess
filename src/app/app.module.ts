import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
// import { NgxChessBoardModule } from "ngx-chess-board";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChessBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NgxChessBoardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
