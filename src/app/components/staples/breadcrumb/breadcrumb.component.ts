import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  currentUrl: string = '';
  novelName: string = '';
  capNro: string = '';
  partesmin: string[] = [];
  partes: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url.split('?')[0]; // Ignorar parâmetros na URL
        this.partesmin = this.currentUrl?.split('/');
        this.partes = this.partesmin.map((str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }); // Divide a string em partes usando '/'
        if (this.partes.length >= 3) {
          this.novelName = this.partes[2]?.replace(/-/g, ' ');
          this.novelName = this.capitalizeWords(this.novelName);
        }

        if (this.partes.length >= 5) {
          this.capNro = this.partes[4];
        }
      }
    });
  }

  capitalizeWords(input: string): string {
    const words = input?.split(' '); // Divide a string em palavras
    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords?.join(' '); // Junta as palavras novamente
  }
}
