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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListCriteriaComponent,
    ButtonRendererComponent,
    CheckBoxRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
