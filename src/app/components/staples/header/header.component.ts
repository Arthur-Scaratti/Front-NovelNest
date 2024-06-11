import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApicallService } from '../../../services/apicall.service';
import { ThemeComponent } from '../../theme/theme.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent, SearchBarComponent, NgIf, ThemeComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  apicallservice = inject (ApicallService);
  isLoggedIn = false;
  userName: string | null = null;
  showOptions = false;
  showOptionsLogged = false;  
  showTheme = false;
  isLightTheme = false;
  currentBaseColorClass = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];

  constructor() {
    this.initializeTheme();
    this.initializeBaseColor();
    this.checkAuthToken();
  }

  private initializeTheme(): void {
    const savedTheme = this.getFromLocalStorage('theme');
    if (savedTheme) {
      this.applyTheme(savedTheme);
      this.isLightTheme = savedTheme === 'light-mode';
    }
  }

  private initializeBaseColor(): void {
    const savedBaseColor = this.getFromLocalStorage('base-color');
    if (savedBaseColor) {
      this.applyBaseColor(savedBaseColor);
      this.currentBaseColorClass = savedBaseColor;
    }
  }

  private checkAuthToken(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        this.verifyToken();
      }
    }
  }

  private getFromLocalStorage(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private verifyToken(): void {
    this.apicallservice.validateToken().subscribe({
      next: (response) => {
        this.userName = response.username;
        this.isLoggedIn = true;
      },
      error: (error) => {
        console.error('Token validation error', error);
      },
    });
  }
  
  logout(): void {
    sessionStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/refresh']).then(() => {
      this.router.navigate(['/home']);
    });
  }

  onMouseEnterUser(): void {
    if (!this.userName) {
      this.showOptions = true;
    } else {
      this.showOptionsLogged = true;
    }
  }

  onMouseLeaveUser(): void {
    this.showOptions = false;
    this.showOptionsLogged = false;
  }

  onMouseEnterTheme(): void {
    this.showTheme = true;
  }

  onMouseLeaveTheme(): void {
    this.showTheme = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  applyTheme(theme: string): void {
    const rootElement = document.documentElement;
    if (theme === 'light-mode') {
      rootElement.classList.add('light-mode');
    } else {
      rootElement.classList.remove('light-mode');
    }
  }

  applyBaseColor(color: string): void {
    const rootElement = document.documentElement;
    rootElement.classList.remove(...this.availableColors);
    rootElement.classList.add(color);
  }
}
