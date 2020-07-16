import { CriteriaValue } from './../../model/criteriaValue.model'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CriteriaType } from 'src/app/model/criteriaType.model'
import { ButtonRendererComponent } from 'src/app/components/grid-renderer/button-renderer.component'
import { ApiService } from 'src/app/services/api.service'
import { ModalService } from 'src/app/_modal'
import { Observable, forkJoin } from 'rxjs'

@Component({
  selector: 'app-edit-criteria',
  templateUrl: './edit-criteria.component.html',
  styleUrls: ['./edit-criteria.component.scss'],
})
export class EditCriteriaComponent implements OnInit {

  criteriaType: CriteriaType
  criteriaValues: CriteriaValue[]
  newValue: CriteriaValue = new CriteriaValue()
  editingValue: CriteriaValue = new CriteriaValue()
  private gridApi
  private gridColumnApi
  modalId = 'values-modal'
  bulkValues = ''

  // ag-grid definitions
  columnDefs = [
    { headerName: 'Name', field: 'value_display', rowDrag: true, editable: true },

    { headerName: 'Order', field: 'value' },

    {
      headerName: 'Actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        buttons: [{
          onClick: this.onBtnDeleteClick.bind(this),
          label: 'Delete',
          icon: 'trash',
        }]
      },
    },
  ]

  frameworkComponents = {
    actionsRenderer: ButtonRendererComponent,
  }

  defaultColDef = { resizable: true }

  onBtnDeleteClick($event) {
    const { id, name } = $event.rowData
    this.deleteValue(id)
  }

  async onRowDragEnd($event) {
    const rows = $event.api.rowModel.rowsToDisplay.map(x => {
      return {
        value: x.childIndex,
        id: x.data.id,
        value_display: x.data.value_display,
      }
    })
    console.log('rows', rows)

    for (const criteriaValue of rows) {
      this.apiService.updateCriteriaValue(window.localStorage.getItem('criteriaTypeId'), criteriaValue).toPromise()
    }

    const rowUpdates: Observable<any>[] = []
    if (this.gridApi) this.gridApi.showLoadingOverlay();
    for (const criteriaValue of rows) {
      rowUpdates.push(this.apiService.updateCriteriaValue(window.localStorage.getItem('criteriaTypeId'), criteriaValue))
    }
    forkJoin(rowUpdates).subscribe({
      next: () => {
        this.update()
      }
    })
  }

  onGridReady(params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    if (this.gridApi) this.gridApi.sizeColumnsToFit()
    return
  }
  // ag-grid definitions


  constructor(private router: Router, private apiService: ApiService, private modalService: ModalService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('criteriaTypeId')) this.navigateBack()

    this.apiService.getCriteriaType(window.localStorage.getItem('criteriaTypeId'))
      .subscribe(data => {
        console.log('type', data)
        this.criteriaType = data
      })
    this.update()
  }

  openModal() {
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }

  async importValues() {
    const criteriaId = window.localStorage.getItem('criteriaTypeId')
    console.log('import', this.bulkValues.trim().split('\n'))

    await this.apiService.deleteAllCriteriaValues(criteriaId).toPromise()

    const rowUpdates: Observable<any>[] = []
    let i = 0;
    for (const value of this.bulkValues.trim().split('\n')) {
      const newValue = new CriteriaValue()
      newValue.value = i
      newValue.value_display = value

      rowUpdates.push(this.apiService.addCriteriaValue(criteriaId, newValue))
      i++
    }

    forkJoin(rowUpdates).subscribe({
      next: () => {
        console.log('finished saving')
        this.bulkValues = ''
        this.update()
        this.closeModal()
      }
    })
  }

  addValue() {
    this.apiService.addCriteriaValue(window.localStorage.getItem('criteriaTypeId'), this.newValue)
      .subscribe(_ => {
        this.newValue = new CriteriaValue()
        this.ngOnInit()
      })
  }

  deleteValue(valueId: string) {
    if (confirm(`are you sure you want to delete this value?`)) {
      this.apiService.deleteCriteriaValue(valueId)
        .subscribe(_ => {
          this.ngOnInit()
        })
    }
  }

  editValue(item: CriteriaValue) {
    this.editingValue = item
  }

  cancelEditValue() {
    this.editingValue = new CriteriaValue()
    this.ngOnInit()
  }

  saveEditValue() {
    this.apiService.updateCriteriaValue(window.localStorage.getItem('criteriaTypeId'), this.editingValue)
      .subscribe(_ => {
        this.editingValue = new CriteriaValue()
        this.ngOnInit()
      })
  }

  updateCriteria() {
    this.apiService.updateCriteriaType(this.criteriaType)
      .subscribe(_ => {
        this.ngOnInit()
      })
  }

  update() {
    this.apiService.getCriteriaType(window.localStorage.getItem('criteriaTypeId'))
      .subscribe((data: CriteriaType) => {
        this.criteriaType = data
        console.log('criteria', this.criteriaType)
      })

    this.apiService.getCriteriaValues(window.localStorage.getItem('criteriaTypeId'))
      .subscribe((data: CriteriaValue[]) => {
        this.criteriaValues = data
        // console.log('criteria values', this.criteriaValues)
      })
  }

  navigateBack() {
    this.router.navigate(['list-criteria'])
  }

}
