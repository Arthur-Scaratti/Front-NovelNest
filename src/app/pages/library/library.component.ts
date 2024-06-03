import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  providers: [ApicallService],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  recentAccess: any[] = [];
  constructor(private apicallService: ApicallService) {}

  ngOnInit(): void {
    this.apicallService.getRecentAccess().subscribe(
      (data) => {
        this.recentAccess = data;
        console.log(data);
      },
      (error) => {
        console.error('Erro ao buscar acessos recentes:', error);
      }
    );
  }
}
