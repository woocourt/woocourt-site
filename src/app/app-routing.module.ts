import { ListUsersComponent } from './user/list-users/list-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCriteriaComponent } from './criteria/list-criteria/list-criteria.component';
import { LoginComponent } from './login/login.component';
import { EditCriteriaComponent } from './criteria/edit-criteria/edit-criteria.component';
import { UserCriteriaComponent } from './user/user-criteria/user-criteria.component';
import { UserCriteriaExternalComponent } from './user/user-criteria-external/user-criteria-external.component';


const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'list-criteria', component: ListCriteriaComponent },
  { path: 'edit-criteria', component: EditCriteriaComponent },
  { path: 'user-criteria', component: UserCriteriaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-questions/user/:userid', component: UserCriteriaExternalComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
