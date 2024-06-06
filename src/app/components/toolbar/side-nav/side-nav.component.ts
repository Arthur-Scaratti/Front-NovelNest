import { Component, Input, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { ApicallService } from '../../../services/apicall.service';
import { HttpClient } from '@angular/common/http';
import { ListChapters } from '../../../models/listchapters';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, NgClass, NgFor],
  providers: [ApicallService, HttpClient],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements AfterViewInit {
  chapters?: ListChapters[] = [];
  novelName?: string = '';
  urlName: any;
  language: any;
  capNro = this.route.snapshot.paramMap.get('capNro') ?? '';

  @ViewChildren('chapterItem') chapterItems!: QueryList<ElementRef>;

  constructor(
    private apicallservice: ApicallService,
    private route: ActivatedRoute,
  ) {
    this.obterCapitulos();
  }

  ngAfterViewInit() {
    this.scrollToCurrentChapter();
  }

  obterCapitulos() {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
      if (chapters && chapters.chapters) {
        this.chapters = chapters.chapters.filter(chapter => chapter.language === 'EN');
        this.novelName = chapters.novelName;
        this.scrollToCurrentChapter();
      }
    });
  }

  scrollToCurrentChapter() {
    const currentChapterElement = this.chapterItems.find(
      item => item.nativeElement.dataset.capnro == parseInt(this.capNro) -1
    );
    if (currentChapterElement) {
      currentChapterElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  gerarHref(capNro: number): string {
    const rotaBase = `/home/${this.urlName}/chapters/${capNro}`;
    return rotaBase;
  }
}
