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


@NgModule({
  declarations: [
    AppComponent,
    ListCriteriaComponent,
    ButtonRendererComponent,
    CheckBoxRendererComponent,
    LoginComponent,
    EditCriteriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
