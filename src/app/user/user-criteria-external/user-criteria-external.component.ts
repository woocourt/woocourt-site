import { CriteriaValue } from './../../model/criteriaValue.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CriteriaType } from 'src/app/model/criteriaType.model';

@Component({
  selector: 'app-user-criteria',
  templateUrl: './user-criteria-external.component.html',
  styleUrls: ['./user-criteria-external.component.scss']
})
export class UserCriteriaExternalComponent implements OnInit {

  criteria: CriteriaType[]
  userId: string
  values: any = {}

  criteriaDataTypes = {
    SNGVAL: 'f5463324-65dc-4e47-9076-481105022754',
    MLTVAL: '8f360704-83f1-4d85-95bd-8166a1a72a48',
    BTHYR: '811fa0ac-a90a-4767-a0c9-6cfe156e478a',
    NUMVAL: 'e9e432e2-cbfd-473e-bd0d-9988ca96f927',
    NUMRNG: '0831f6fe-89d1-4b7c-896b-07b583b5a183',
  }

  constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userid')
    });
    this.updateCriteriaTypes()
  }

  updateCriteriaTypes() {
    this.apiService.getCriteriaTypes()
    .subscribe((data: CriteriaType[]) => {
      for (const item of data) {
        this.apiService.getCriteriaValues(item.id)
        .subscribe((values: CriteriaValue[]) => {
          item.values = values
        })
      }
      this.criteria = data
      this.criteria.forEach(c => {
        this.values[c.id] = {}
      })
    })
  }

  navigateBack() {
    this.router.navigate(['list-users'])
  }

  birthYears(): number[] {
    const range = (start, end) => {
      const list = [];
      for (let i = start; i <= end; i++) {
          list.push(i);
        }
      return list
    }

    const currentYear = new Date().getFullYear()

    return range(1950, currentYear - 18)
  }

  sendValues() {
    console.log('values to send', this.values)
    const processedValues = Object.keys(this.values).map(criteriaId => ({
      criteria: this.criteria.find(x => x.id === criteriaId),
      value: this.values[criteriaId]
    }))
    console.log('processed', processedValues)
    this.apiService.saveAllUserCriteria(this.userId, processedValues)
  }
}
