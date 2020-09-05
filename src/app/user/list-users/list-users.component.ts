import { environment } from './../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../model/user.model'
import { ApiService } from 'src/app/services/api.service'
import { ModalService } from 'src/app/_modal';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private modalService: ModalService) {
    this.users = []
  }

  users: User[]
  newUser: User = new User()
  modalId = 'generate-link-modal'
  userQuestionsLink = ''


  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login'])
      return
    }
    this.apiService.getAllUsers()
      .subscribe((data: User[]) => {
        this.users = data
      })
  }

  deleteUser(id: string, name: string): void {
    if (confirm(`are you sure you want to delete ${name} and all its possible values?`)) {
      this.apiService.deleteUser(id)
        .subscribe(_ => {
          this.users = this.users.filter(u => u.id !== id)
        })
    }
  }

  addUser(): void {
    this.apiService.addUser(this.newUser)
      .subscribe(_ => {
        this.newUser = new User()
        this.ngOnInit()
      })
  }

  editUser(id: string): void {
    window.localStorage.removeItem('userId')
    window.localStorage.setItem('userId', id)
    this.router.navigate(['user-criteria'])
  }

  generateQuestionsLink(id: string) {
    this.openGenerateLinkModal(id)
  }

  openGenerateLinkModal(userId: string) {
    this.userQuestionsLink = `${environment.baseUrl}user-questions/user/${userId}`
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId)
    this.userQuestionsLink = ''
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  };

  onCodeChanged($event) {
    console.log('on code changed', $event)
  }
  onCodeCompleted($event) {
    console.log('on code completed', $event)
    this.newUser.pin = $event.split('')
    console.log('user', this.newUser)
  }

  getPinString(user: User) {
    if (!user.pin) return;
    return user.pin.join('').replace(/ /g, '')
  }
}
