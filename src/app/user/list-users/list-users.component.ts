import { Component, OnInit , Inject} from '@angular/core'
import {Router} from '@angular/router'
import {User} from '../../model/user.model'
import { ApiService } from 'src/app/services/api.service'


@Component({
  selector: 'app-list-user',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {
    this.users = []
   }

  users: User[]
  newUser: User = new User()

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login'])
      return
    }
    this.apiService.getAllUsers()
      .subscribe( (data: User[]) => {
        this.users = data
      })
  }

  deleteUser(id: string,  name: string): void {
    if (confirm(`are you sure you want to delete ${name} and all its possible values?`)) {
    this.apiService.deleteUser(id)
      .subscribe( _ => {
        this.users = this.users.filter(u => u.id !== id)
      })
    }
  }

  addUser(): void {
    this.apiService.addUser(this.newUser)
      .subscribe( _ => {
        this.newUser = new User()
        this.ngOnInit()
      })
  }

  editUser(id: string): void {
    window.localStorage.removeItem('userId')
    window.localStorage.setItem('userId', id)
    this.router.navigate(['user-features'])
  }
}
