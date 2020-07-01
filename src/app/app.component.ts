import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'woocourt-frontend'
  selected = 0
  TAB_USERS = 0
  TAB_CRITERIA = 1


  constructor(private router: Router) {
    const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    if (url.indexOf('list-criteria') >= 0 ) {
      this.selected = this.TAB_CRITERIA
    }
  }

  onTabClick(selectedTab: number) {
    this.selected = selectedTab
    switch (selectedTab) {
      case this.TAB_USERS:
        this.router.navigate(['list-users'])
        break
      case this.TAB_CRITERIA:
        this.router.navigate(['list-criteria'])
        break
    }
  }
}
