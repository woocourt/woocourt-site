import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCriteriaComponent } from './criteria/list-criteria/list-criteria.component';


const routes: Routes = [
  { path: 'list-criteria', component: ListCriteriaComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
