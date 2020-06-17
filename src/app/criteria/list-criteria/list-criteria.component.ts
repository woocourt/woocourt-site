import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/components/grid-renderer/button-renderer.component';
import { CheckBoxRendererComponent } from 'src/app/components/grid-renderer/checkbox-renderer.component';

@Component({
  selector: 'app-list-criteria',
  templateUrl: './list-criteria.component.html',
  styleUrls: ['./list-criteria.component.scss']
})
export class ListCriteriaComponent implements OnInit {

  // ag-grid definitions
  private gridApi
  private gridColumnApi

  columnDefs = [
    {headerName: 'Name', field: 'name', rowDrag: true, editable: true},
    {headerName:
      'Required', field:
      'required',
      suppressSizeToFit: true,
      cellRenderer: 'checkboxRenderer',
      cellRendererParams: {
        onChange: this.requiredChanged.bind(this),
      },
    },
    {headerName: 'Order', field: 'display_order', suppressSizeToFit: true },
    {
      headerName: 'Save',
      cellRenderer: 'actionsRenderer',
      suppressSizeToFit: true,
      cellRendererParams: {
        onClick: this.onBtnSaveClick.bind(this),
        label: 'Save',
      },
    },
    {
      headerName: 'Delete',
      cellRenderer: 'actionsRenderer',
      suppressSizeToFit: true,
      cellRendererParams: {
        onClick: this.onBtnDeleteClick.bind(this),
        label: 'Delete',
      },
    },
    {
      headerName: 'Edit',
      cellRenderer: 'actionsRenderer',
      suppressSizeToFit: true,
      cellRendererParams: {
        onClick: this.onBtnEditClick.bind(this),
        label: 'Edit',
      },
    },
  ]

  defaultColDef = { resizable: true }

  frameworkComponents = {
    actionsRenderer: ButtonRendererComponent,
    checkboxRenderer: CheckBoxRendererComponent,
  }


  criteria = [
    { name: 'criteria 1 aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaa a', required: true, display_order: 0 },
    { name: 'criteria 2', required: false, display_order: 1 },
    { name: 'criteria 3', required: true, display_order: 2 },
  ];

  // ag grid methods
  async requiredChanged($event) {
    console.log('required changed', $event)
    const type = {
      id: $event.rowData.id,
      name: $event.rowData.name,
      required: $event.checked,
      display_order: $event.rowIndex,
      values: [],
    }
    //await this.apiService.updateCriteriaType(type).toPromise()
  }

  async onBtnSaveClick($event) {
    const type = {
      id: $event.rowData.id,
      name: $event.rowData.name,
      required: $event.rowData.required,
      display_order: $event.rowIndex,
      values: [],
    }
    //await this.apiService.updateCriteriaType(type).toPromise()
  }

  onBtnDeleteClick($event) {
    const {id, name} = $event.rowData
    this.deleteCriteria(id, name)
  }

  onBtnEditClick($event) {
    const {id} = $event.rowData
    this.editCriteriaType(id)
  }

  onRowDragEnd($event) {
    const rows = $event.api.rowModel.rowsToDisplay.map(x => {
      return {
        display_order: x.childIndex,
        id: x.data.id,
        name: x.data.name,
        required: x.data.required,
        values: [],
      }
    })

    for (const criteriaType of rows) {
      //this.apiService.updateCriteriaType(criteriaType).subscribe()
    }
  }

  onGridReady(params) {
    console.log('ready')
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.gridApi.sizeColumnsToFit()
    return
  }

  onModelUpdated($event) {
    console.log('updated')
    this.gridApi.sizeColumnsToFit()
    return
  }

  constructor() { }

  ngOnInit(): void {
  }

  deleteCriteria(id: string,  name: string): void {
    if (confirm(`are you sure you want to delete ${name} and all its possible values?`)) {
      // this.apiService.deleteCriteriaType(id)
      //   .subscribe( _ => {
      //     this.criteria = this.criteria.filter(s => s.id !== id)
      //   })
    }
  }

  addCriteria() {
    // this.apiService.addCriteriaType(this.newCriteria)
    //   .subscribe( _ => {
    //     this.newCriteria = new CriteriaType()
    //     this.ngOnInit()
    //   })
  }

  addCriteriaType(): void {
    // this.router.navigate(['add-criteria'])
  }

  editCriteriaType(id: string): void {
    window.localStorage.removeItem('criteriaTypeId')
    window.localStorage.setItem('criteriaTypeId', id)
    // this.router.navigate(['edit-criteria'])
  }
}
