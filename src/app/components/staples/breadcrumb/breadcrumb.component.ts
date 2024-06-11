import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { map, startWith, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink],
  providers: [],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  router = inject(Router);
  breadcrumb$?: Observable<{ partes: string[], partesmin: string[], novelName: string, capNro: string }>;
  currentUrl: string = '';
  novelName: string = '';
  capNro: string = '';
  partesmin: string[] = [];
  partes: string[] = [];

  constructor() {
    this.breadcrumb$ = this.router.events.pipe(
      startWith(new NavigationEnd(0, this.router.url, this.router.url)), // Emite o evento inicial
      map(event => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url.split('?')[0]; // Ignora parâmetros na URL
          const partesmin = currentUrl.split('/');
          const partes = partesmin.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
          let novelName = '';
          if (partes.length >= 3) {
            novelName = partes[2]?.replace(/-/g, ' ');
            novelName = this.capitalizeWords(novelName);
          }
          const capNro = partes.length >= 5 ? partes[4] : '';

          return { partes, partesmin, novelName, capNro };
        }
        return { partes: [], partesmin: [], novelName: '', capNro: '' };
      })
    );
  }

  capitalizeWords(input: string): string {
    const words = input?.split(' '); // Divide a string em palavras
    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords?.join(' '); // Junta as palavras novamente
  }
}
