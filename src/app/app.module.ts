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
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ListUsersComponent } from './user/list-users/list-users.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    ListCriteriaComponent,
    ButtonRendererComponent,
    CheckBoxRendererComponent,
    LoginComponent,
    EditCriteriaComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}, { provide: NZ_I18N, useValue: en_GB }],
  bootstrap: [AppComponent]
})
export class AppModule { }
