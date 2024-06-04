import { Component, Input } from '@angular/core';
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
  chapters?: ListChapters[] = [];
  novelName?: string = '';
  urlName: any;
  language: any;
  capNro: number = 0;
  constructor(
    private apicallservice: ApicallService,
    private route: ActivatedRoute,
  ) {
    this.obterCapitulos();
  }

  obterCapitulos() {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
      if (chapters && chapters.chapters) {
        this.chapters = chapters.chapters.filter(
          (chapter) => chapter.language === 'EN',
        );
        this.novelName = chapters.novelName;
      }
    });
  }

  gerarHref(capNro: number): string {
    // Suponha que você tenha uma rota base
    const rotaBase = `/home/${this.urlName}/chapters/${capNro}`;
    return rotaBase;
  }
}
