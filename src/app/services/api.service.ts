import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {User} from '../model/user.model'
import {Story} from '../model/story.model'
import {Character} from '../model/character.model'
import {Observable} from 'rxjs/index'
import {ApiResponse} from '../model/api.response'
import { CriteriaType } from '../model/criteriaType.model'
import { environment } from '../../environments/environment'
import { CriteriaValue } from '../model/criteriaValue.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiEndPoint // 'https://localhost:44305/api'

  getCriteriaTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/criteria`)
  }

  getCriteriaDataTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/criteria/dataTypes`)
  }

  getCriteriaType(id: string): Observable<CriteriaType> {
    return this.http.get<any>(`${this.baseUrl}/criteria/${id}`)
  }

  getCriteriaValues(id: string): Observable<CriteriaValue[]> {
    return this.http.get<any>(`${this.baseUrl}/criteria/values/${id}`)
  }

  deleteCriteriaType(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/criteria/delete/${id}`)
  }

  addCriteriaType(criteriaType: CriteriaType): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/criteria`, criteriaType)
  }

  addCriteriaValue(criteriaId: string, criteriaValue: CriteriaValue) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/criteria/value/${criteriaId}`, criteriaValue)
  }

  deleteCriteriaValue(valueId: string) {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/criteria/value/delete/${valueId}`)
  }

  updateCriteriaValue(criteriaTypeId: string, criteriaValue: CriteriaValue) {
    return this.http.put<ApiResponse>(`${this.baseUrl}/criteria/value/update/${criteriaTypeId}`, criteriaValue)
  }

  updateCriteriaType(criteriaType: CriteriaType): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/criteria/update/${criteriaType.id}`, criteriaType)
  }

  login(loginPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/accounts/generate-token`, loginPayload)
  }

  deleteUser(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/user/delete/${id}`)
  }

  addUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/user`, user)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/user`)
  }

  getUserCriteria(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/criteria/${id}`)
  }

  saveUserCriteria(user_id: string, criteria_value_id: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/user/criteria`, {
      user_id,
      criteria_value_id,
    })
  }

  ///////////////////////// old example methods



  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id)
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user)
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user)
  }



  getStories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Stories`)
  }

  getStoryCharacters(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Characters/Stories/${id}`)
  }

  deleteStory(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/Stories/${id}`)
  }

  createStory(story: Story): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Stories`, {Genre: story.genre, Title: story.title})
  }

  getStoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Stories/${id}`)
  }

  updateStory(story: Story): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/Stories`, story)
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Genres`)
  }

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Characters`)
  }

  getCharacterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Characters/${id}`)
  }

  deleteCharacter(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/Characters/${id}`)
  }

  addCharacter(storyId: string, character: Character): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Stories/${storyId}/Characters`, character)
  }

}
