import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-button-renderer',
  template: `
    <a style="margin-right: 1em;" *ngFor="let action of params.buttons" (click)="onClick($event, action.onClick)">{{action.label}}</a>
    `,
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params
  label: string

  agInit(params): void {
    this.params = params
  }

  refresh(params?: any): boolean {
    return true
  }

  onClick($event, clickMethod) {
    if (clickMethod instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        rowIndex: this.params.rowIndex,
        // ...something
      }
      //this.params.onClick(params)
      clickMethod(params)
    }
  }
}
