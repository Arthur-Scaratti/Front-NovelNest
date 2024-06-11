import { Component, OnInit, inject } from '@angular/core';
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
export class AppComponent {
  title = 'novelnest';
  router = inject (Router);
  viewportScroller = inject (ViewportScroller);
  scroll$ = this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  });
  constructor() {}
}
