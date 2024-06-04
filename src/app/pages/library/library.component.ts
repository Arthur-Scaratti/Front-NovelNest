import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  providers: [ApicallService],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})

export class LibraryComponent {
  apicallService = inject(ApicallService);
  recentAccess: any[] = [];
  recentAccess$ =  this.apicallService.getRecentAccess().subscribe({
    next: (data) => {
      this.recentAccess = data;
      console.log(data);
    },
    error: (error) => {
      console.error('Erro ao buscar acessos recentes:', error);
    }
  });
  constructor() {}
}
