import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
// import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-select-renderer',
  template: `
    <div class="form-entry--inline">
      <select (change)="onOptionsSelected($event)">
        <option
          [selected]="option.value === value"
          *ngFor="let option of params.options"
          [value]="option.value">
            {{option.name}}
        </option>
      </select>
    </div>
    `,
})

export class SelectRendererComponent implements ICellRendererAngularComp {

  params
  label: string
  value: boolean

  agInit(params): void {
    // console.log('init select renderer', params)
    this.params = params
    this.value = params.value
  }

  refresh(params?: any): boolean {
    return true
  }

  onOptionsSelected($event) {
    // console.log('event', $event.target.selectedIndex, 'params', this.params)
    if (this.params.onChange instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        // event: $event,
        rowIndex: this.params.rowIndex,
        rowData: this.params.node.data,
        selectedIndex: $event.target.selectedIndex,
        // ...something
      }
      this.params.onChange(params)
    }
  }
}
