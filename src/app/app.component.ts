import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { HeaderComponent } from './components/staples/header/header.component';
import { FooterComponent } from './components/staples/footer/footer.component';
import { BreadcrumbComponent } from './components/staples/breadcrumb/breadcrumb.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'novelnest_0_2';
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
