import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ListCriteriaComponent } from './criteria/list-criteria/list-criteria.component';
import { ButtonRendererComponent } from './components/grid-renderer/button-renderer.component';
import { CheckBoxRendererComponent } from './components/grid-renderer/checkbox-renderer.component';

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
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
