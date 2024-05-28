import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
