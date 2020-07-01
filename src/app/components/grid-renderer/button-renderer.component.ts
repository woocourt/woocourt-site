import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-button-renderer',
  template: `
    <style>
      .grid-button {
        margin-right: 1em;
        padding: 3px 10px 3px 10px;
        text-decoration: none;
        border-radius: 8px;
        background-color: #67a0d8;
        color: white;
        transition-duration: 0.4s;
        transition-property: background-color;
      }
      .grid-button:hover {
        background-color: #1976d2;
      }
      .grid-button-disabled {
        display:none;
      }
    </style>
    <div class="button-container">
      <a
        *ngFor="let button of params.buttons"
        class="grid-button"
        [ngClass]="{'grid-button-disabled': button.disabledDataTypes && button.disabledDataTypes.includes(data_type) }"
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
