import { SelectRendererComponent } from 'src/app/components/grid-renderer/select-renderer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ListCriteriaComponent } from './criteria/list-criteria/list-criteria.component';
import { ButtonRendererComponent } from './components/grid-renderer/button-renderer.component';
import { CheckBoxRendererComponent } from './components/grid-renderer/checkbox-renderer.component';
import {ApiService} from './services/api.service'
import {TokenInterceptor} from './core/interceptor'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EditCriteriaComponent } from './criteria/edit-criteria/edit-criteria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { ModalModule } from './_modal';
import { UserCriteriaComponent } from './user/user-criteria/user-criteria.component';
import { UserCriteriaExternalComponent } from './user/user-criteria-external/user-criteria-external.component';

import { CodeInputModule } from 'angular-code-input';

import { ToastrModule } from 'ngx-toastr';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    ListCriteriaComponent,
    ButtonRendererComponent,
    CheckBoxRendererComponent,
    SelectRendererComponent,
    LoginComponent,
    EditCriteriaComponent,
    ListUsersComponent,
    UserCriteriaComponent,
    UserCriteriaExternalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    CodeInputModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
