import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { ListChapters, TagsNovel } from '../../models/listchapters';
import { NgClass, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-novel-header',
  standalone: true,
  imports: [RouterLink, NgClass, NgFor],
  providers: [ApicallService],
  templateUrl: './novel-header.component.html',
  styleUrl: './novel-header.component.scss',
})
export class NovelHeaderComponent {
  apicallservice = inject(ApicallService);
  route = inject(ActivatedRoute);
  expanded: boolean = false;
  urlName = this.route.snapshot.paramMap.get('urlName') ?? '';
  novelName: string | null = null;
  description: string | null = null;
  status: string | any;
  nro_capitulos_en: number | any;
  autor: string | null = null;
  tags: TagsNovel[] | null = null;
  chapters: ListChapters[] | null = null;
  chapters$ = this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
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
  constructor() {}

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
