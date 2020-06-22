import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'woocourt-frontend';
  selected = 0;

  onTabClick(selectedTab: number) {
    this.selected = selectedTab
  }
}
