import { Component, ViewChild } from '@angular/core';
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
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  userName: string | null = null;
  showOptions = false;
  showOptionsLogged = false;
  showTheme = false;
  isLightTheme = false;
  currentBaseColorClass = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];

  constructor(
    private router: Router,
    private apicallService: ApicallService,
  ) {
    if (typeof window === 'object' || typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.applyTheme(savedTheme);
        this.isLightTheme = savedTheme === 'light-mode';
      }

      const savedBaseColor = localStorage.getItem('base-color');
      if (savedBaseColor) {
        this.applyBaseColor(savedBaseColor);
        this.currentBaseColorClass = savedBaseColor;
      }
    }
  }

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
      },
    );
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.userName = null;
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
    if (theme === 'light-mode') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }

  applyBaseColor(color: string): void {
    document.documentElement.classList.remove(...this.availableColors);
    document.documentElement.classList.add(color);
  }
}