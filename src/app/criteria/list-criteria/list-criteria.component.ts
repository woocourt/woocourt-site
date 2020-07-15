import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/components/grid-renderer/button-renderer.component';
import { CheckBoxRendererComponent } from 'src/app/components/grid-renderer/checkbox-renderer.component';
import { SelectRendererComponent } from 'src/app/components/grid-renderer/select-renderer.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CriteriaType } from 'src/app/model/criteriaType.model';
import { Observable, forkJoin } from 'rxjs';
import { DataTypes } from 'src/app/utils/dataTypes.enum';

@Component({
  selector: 'app-list-criteria',
  templateUrl: './list-criteria.component.html',
  styleUrls: ['./list-criteria.component.scss']
})
export class ListCriteriaComponent implements OnInit {

  criteria: CriteriaType[]
  newCriteria: CriteriaType = new CriteriaType()
  dataTypes = []
  defaultColDef = { resizable: true }
  columnDefs = []

  frameworkComponents = {
    actionsRenderer: ButtonRendererComponent,
    checkboxRenderer: CheckBoxRendererComponent,
    selectRenderer: SelectRendererComponent
  }

  constructor(private router: Router, private apiService: ApiService) {
    this.criteria = []
    this.newCriteria.required = false

    for (const property in DataTypes.criteriaDataTypes) {
      if (DataTypes.criteriaDataTypes.hasOwnProperty(property)) {
        this.dataTypes.push({
          value: DataTypes.criteriaDataTypes[property].id,
          name: DataTypes.criteriaDataTypes[property].name,
        })
      }
    }

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        rowDrag: true,
        onCellValueChanged: this.onCellNameChanged.bind(this),
        editable: true
      },
      {
        headerName: 'Required',
        field: 'required',
        suppressSizeToFit: true,
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          onChange: this.requiredChanged.bind(this),
        },
      },
      {
        headerName: 'Data Type',
        field: 'data_type',
        suppressSizeToFit: true,
        cellRenderer: 'selectRenderer',
        cellRendererParams: {
          onChange: this.typeChanged.bind(this),
          options: this.dataTypes,
        },
      },
      { headerName: 'Order', field: 'display_order', suppressSizeToFit: true },
      {
        headerName: 'Actions',
        field: 'data_type',
        cellRenderer: 'actionsRenderer',
        suppressSizeToFit: true,
        cellRendererParams: {
          buttons: [{
            onClick: this.onBtnDeleteClick.bind(this),
            label: 'Delete',
            icon: 'trash',
          }, {
            onClick: this.onBtnEditClick.bind(this),
            label: 'Edit',
            icon: 'pencil',
            disabledDataTypes: [DataTypes.criteriaDataTypes.BTHYR.id],
          }]
        }
      },
    ]

  }

  // ag-grid definitions
  private gridApi
  private gridColumnApi


  async onCellNameChanged($event) {
    await this.apiService.updateCriteriaType({
      ...$event.data,
      values: [],
    }).toPromise()
  }

  // ag grid methods
  async requiredChanged($event) {
    const type = {
      id: $event.rowData.id,
      name: $event.rowData.name,
      required: $event.checked,
      display_order: $event.rowIndex,
      data_type: $event.rowData.data_type,
      values: [],
    }
    await this.apiService.updateCriteriaType(type).toPromise()
  }

  async typeChanged($event) {
    // console.log('type changed', $event, 'type selected', this.dataTypes[$event.selectedIndex])
    const type = {
      id: $event.rowData.id,
      name: $event.rowData.name,
      required: $event.rowData.required,
      display_order: $event.rowIndex,
      data_type: this.dataTypes[$event.selectedIndex].value,
      values: [],
    }
    await this.apiService.updateCriteriaType(type).toPromise()
  }

  onBtnDeleteClick($event) {
    const { id, name } = $event.rowData
    this.deleteCriteria(id, name)
  }

  onBtnEditClick($event) {
    const { id } = $event.rowData
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

    const rowUpdates: Observable<any>[] = []
    this.gridApi.showLoadingOverlay();
    for (const criteriaType of rows) {
      rowUpdates.push(this.apiService.updateCriteriaType(criteriaType))
    }
    forkJoin(rowUpdates).subscribe({
      next: () => {
        this.apiService.getCriteriaTypes()
          .subscribe((data: CriteriaType[]) => {
            this.criteria = data
            // console.log('criteria', this.criteria)
          })
      }
    })
  }

  onGridReady(params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    if (this.gridApi) { this.gridApi.sizeColumnsToFit() }
    return
  }

  onModelUpdated($event) {
    if (this.gridApi) { this.gridApi.sizeColumnsToFit() }
    return
  }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login'])
      return
    }
    this.apiService.getCriteriaTypes()
      .subscribe((data: CriteriaType[]) => {
        this.criteria = data
        // console.log('criteria', this.criteria)
      })
  }

  deleteCriteria(id: string, name: string): void {
    if (confirm(`are you sure you want to delete ${name} and all its possible values?`)) {
    this.apiService.deleteCriteriaType(id)
      .subscribe(_ => {
        this.criteria = this.criteria.filter(s => s.id !== id)
      })
  }
    }

  addCriteria() {
    this.apiService.addCriteriaType(this.newCriteria)
      .subscribe(_ => {
        this.newCriteria = new CriteriaType()
        this.ngOnInit()
      })
  }

  editCriteriaType(id: string): void {
    window.localStorage.removeItem('criteriaTypeId')
    window.localStorage.setItem('criteriaTypeId', id)
    this.router.navigate(['edit-criteria'])
  }
}
