import { CriteriaValue } from './criteriaValue.model'

export class CriteriaType {
  id: string
  name: string
  required: boolean
  display_order: number
  data_type: string
  values: CriteriaValue[]
}
