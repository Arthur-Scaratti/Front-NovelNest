import { Component, inject} from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { ApicallService } from '../../../services/apicall.service';
import { HttpClient } from '@angular/common/http';
import { ListChapters } from '../../../models/listchapters';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, NgClass],
  providers: [ApicallService, HttpClient],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})

export class SideNavComponent {
  apicallservice = inject(ApicallService);
  route = inject(ActivatedRoute);
  urlName = this.route.snapshot.paramMap.get('urlName') ?? '';
  chapters$ = this.urlName ?  this.obterCapitulos(this.urlName): {};
  chapters: ListChapters[] = []; 
  novelName: string | undefined;

  constructor() {}

  obterCapitulos(urlName: string): void {
    this.apicallservice.getChapters(urlName).subscribe(
      (chapters) => {
        if (chapters && chapters.chapters) {
          this.chapters = chapters.chapters.filter(
            (chapter) => chapter.language === 'EN'
          );
          this.novelName = chapters.novelName;
        }
      },
      (error) => {
        console.error('Erro ao obter capítulos:', error);
      }
    );
  }

  gerarHref(capNro: number): string {
    if (!this.urlName) {
      throw new Error('urlName não definido');
    }
    return `/home/${this.urlName}/chapters/${capNro}`;
  }
}