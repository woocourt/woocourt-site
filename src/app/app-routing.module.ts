import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCriteriaComponent } from './criteria/list-criteria/list-criteria.component';
import { LoginComponent } from './login/login.component';
import { EditCriteriaComponent } from './criteria/edit-criteria/edit-criteria.component';


const routes: Routes = [
  { path: 'list-criteria', component: ListCriteriaComponent },
  { path: 'edit-criteria', component: EditCriteriaComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
