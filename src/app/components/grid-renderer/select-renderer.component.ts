import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid'

@Component({
  selector: 'app-select-renderer',
  template: `
  <style>
    .box {
      top: 50%;
      left: 50%;
    }

    .box select {
      color: #0563af;
      background-color: white;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 16px;
      border: 1px solid;
      border-color: #ddd;
      -webkit-appearance: button;
      appearance: button;
      outline: none;
      padding: 5px;
    }

    .box::before {
      content: "\f13a";
      position: absolute;
      top: 0;
      right: 0;
      width: 20%;
      height: 100%;
      text-align: center;
      font-size: 28px;
      line-height: 45px;
      color: rgba(255, 255, 255, 0.5);
      background-color: rgba(255, 255, 255, 0.1);
      pointer-events: none;
    }

    .box:hover::before {
      color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.2);
    }

    .box select option {
      padding: 30px;
    }
  </style>
    <div class="box">
      <select (change)="onOptionsSelected($event)">
        <option
          [selected]="option.value === value"
          *ngFor="let option of params.options"
          value="option.value">
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
    //console.log('init select renderer', params)
    this.params = params
    this.value = params.value
  }

  refresh(params?: any): boolean {
    return true
  }

  onOptionsSelected($event) {
    //console.log('event', $event.target.selectedIndex, 'params', this.params)
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
