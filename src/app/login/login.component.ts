import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  invalidLogin = false
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    }
    this.apiService.login(loginPayload)
    .pipe(catchError(_ => of({token: ''})))
    .subscribe(data => {
      if (data.token !== '') {
        window.localStorage.setItem('token', data.token)
        this.router.navigate(['list-users'])
      } else {
       this.invalidLogin = true
      }
    })
  }

  ngOnInit() {
    window.localStorage.removeItem('token')
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    })
  }



}
