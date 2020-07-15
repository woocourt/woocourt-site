import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-button-renderer',
  template: `
    <div>
      <a
        *ngFor="let button of params.buttons"
        class="grid__button--primary"
        [ngClass]="{'grid__button--disabled': button.disabledDataTypes && button.disabledDataTypes.includes(data_type) }"
        (click)="onClick($event, button.onClick)">{{button.label}}
      </a>
    </div>
    `,
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params
  label: string
  data_type: string

  agInit(params): void {
    this.params = params
    this.data_type = params.value
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
