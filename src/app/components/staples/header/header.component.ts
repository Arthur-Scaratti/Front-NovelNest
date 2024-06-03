import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApicallService } from '../../../services/apicall.service';
import { ThemeComponent } from '../../theme/theme.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent, SearchBarComponent, NgIf, ThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  isLoggedIn = false;
  userName: string | null = null;
  showOptions = false;
  showOptionsLogged = false;
  constructor(
    private router: Router,
    private apicallService: ApicallService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('authToken');
        if (token) {
        this.verifyToken();
    }
    }
  }

  verifyToken(): void {
    this.apicallService.validateToken().subscribe(
      (response) => {
          this.userName = response.username;
      },
      (error) => {
          console.error('Token validation error', error);
      }
  );
  
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/login']);
  }

  onMouseEnter(): void {
    if (!this.userName) {
      this.showOptions = true;
    }
    else {
      this.showOptionsLogged = true;
    }
  }

  onMouseLeave(): void {
    this.showOptions = false;
    this.showOptionsLogged = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
