import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

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

  isExternal = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    if (url.indexOf('list-criteria') >= 0 ) {
      this.selected = this.TAB_CRITERIA
    }

    this.activatedRoute.queryParamMap.subscribe(params => {
      console.log(window.location.href.indexOf('user-questions'))
      if (window.location.href.indexOf('user-questions') > -1) this.isExternal = true
    });
  }

  showTabs(): boolean {
    return !this.isExternal
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
