import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import {
  ListChapters,
  TagsNovel,
} from '../../models/listchapters';
import { NgClass, NgFor } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-novel-header',
  standalone: true,
  imports: [RouterLink, NgClass, NgFor],
  providers: [ApicallService],
  templateUrl: './novel-header.component.html',
  styleUrl: './novel-header.component.scss',
})
export class NovelHeaderComponent {
  expanded: boolean = false;
  urlName: any;
  novelName: any;
  language: any;
  description: any;
  status: any;
  nro_capitulos_en: any;
  autor: any;
  tags?: TagsNovel[];
  chapters?: ListChapters[];
  lines: any;

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
        this.chapters = chapters.chapters;
        this.novelName = chapters.novelName;
        this.description = chapters.description;
        this.status = chapters.status;
        this.nro_capitulos_en = chapters.nro_capitulos_en;
        this.autor = chapters.autor;
        this.tags = chapters.tags;
      }
    });
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
