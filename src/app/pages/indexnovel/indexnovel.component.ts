import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import {
  ListChaptersResponse,
  GruposDeCapitulos,
  ListChapters,
} from '../../models/listchapters';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BreadcrumbComponent } from '../../components/staples/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/staples/footer/footer.component';
import { NovelHeaderComponent } from '../../components/novel-header/novel-header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-indexnovel',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    FooterComponent,
    NovelHeaderComponent,
    NgIf,
  ],
  providers: [ApicallService, HttpClient],
  templateUrl: './indexnovel.component.html',
  styleUrls: ['./indexnovel.component.scss'],
})
export class IndexnovelComponent {  
  apicallservice = inject(ApicallService);
  route = inject(ActivatedRoute);
  urlName: string = (this.route.snapshot.paramMap.get('urlName')) ?? "";
  novelName: any;
  language = 'EN';
  description: any;
  gruposDeCapitulos: GruposDeCapitulos[] = [];
  grupoAbertoIndex: number = -1;
  chaptersByLanguage: { [key: string]: ListChapters[] } = {};
  latestChapters: ListChapters[] = [];
  
  chapters?: ListChaptersResponse;
  chapters$ = this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
    if (chapters && chapters.chapters) {
      this.chapters = chapters;
      this.novelName = this.chapters.novelName;
      this.description = this.chapters.description;
        for (let i = 0; i < chapters.chapters.length; i++) {
          let chapter = chapters.chapters[i];
          let language = chapter.language;
            if (!this.chaptersByLanguage[language]) {
              this.chaptersByLanguage[language] = [];
            }
          this.chaptersByLanguage[language].push(chapter);
        }
      if (this.chaptersByLanguage['EN']) {
        for (let i = 0; i < this.chaptersByLanguage['EN'].length; i += 100) {
          const grupo = this.chaptersByLanguage['EN'].slice(i, i + 100);
          this.gruposDeCapitulos.push({ rows: grupo });
        }
      }
      this.latestChapters = this.getLatestChapters();
    }
  });

  constructor() {}

  getLatestChapters(): ListChapters[] {
    if (this.chaptersByLanguage['EN']) {
      return this.chaptersByLanguage['EN']
        .sort((a, b) => b.cap_nro - a.cap_nro)
        .slice(0, 10);
    }
    return [];
  }

  toggleLista(index: number) {
    this.grupoAbertoIndex = this.grupoAbertoIndex === index ? -1 : index;
  }

  gerarHref(capNro: number): string {
    const rotaBase = `/home/${this.urlName}/chapters/${capNro}`;
    return rotaBase;
  }
}
