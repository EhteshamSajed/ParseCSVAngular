import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowtableComponent } from './showtable/showtable.component';

const routes: Routes = [
  {path: 'table/:species', component: ShowtableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
