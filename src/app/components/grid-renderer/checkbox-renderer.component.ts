import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-checkbox-renderer',
  template: `
    <label>
      <input type="checkbox" [checked]="value" (change)="onCheckboxChange($event)" />
    </label>
    `,
})

export class CheckBoxRendererComponent implements ICellRendererAngularComp {

  params
  label: string
  value: boolean

  agInit(params): void {
    this.params = params
    this.value = params.value
  }

  refresh(params?: any): boolean {
    return true
  }

  onCheckboxChange($event) {
    console.log($event)
    if (this.params.onChange instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowIndex: this.params.rowIndex,
        rowData: this.params.node.data,
        checked: $event.target.checked,
        // ...something
      }
      this.params.onChange(params)
    }
  }
}