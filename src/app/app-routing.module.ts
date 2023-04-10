import { ChessBoardComponent } from './chess-board/chess-board.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'iframe', component: ChessBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
