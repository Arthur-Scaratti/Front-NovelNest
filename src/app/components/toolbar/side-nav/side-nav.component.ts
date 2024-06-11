import { Component, Input, ViewChild, ElementRef, AfterViewChecked, QueryList, ViewChildren, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
export class SideNavComponent implements AfterViewChecked, OnChanges {
  router = inject (Router);
  chapters?: ListChapters[] = [];
  novelName?: string = '';
  urlName: any;
  language: any;
  capNro = this.route.snapshot.paramMap.get('capNro') ?? '';

  @ViewChildren('chapterItem') chapterItems!: QueryList<ElementRef>;
  private shouldScrollToChapter = false;

  constructor(
    private apicallservice: ApicallService,
    private route: ActivatedRoute,
  ) {
    this.obterCapitulos();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToChapter) {
      this.scrollToCurrentChapter();
      this.shouldScrollToChapter = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.shouldScrollToChapter = true;
  }

  obterCapitulos() {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
      if (chapters && chapters.chapters) {
        this.chapters = chapters.chapters.filter(chapter => chapter.language === 'EN');
        this.novelName = chapters.novelName;
        this.shouldScrollToChapter = true;
      }
    });
  }

  scrollToCurrentChapter() {
    const currentChapterElement = this.chapterItems.find(
      item => item.nativeElement.dataset.capnro == parseInt(this.capNro) - 1
    );
    if (currentChapterElement) {
      currentChapterElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  navigateToChapter(capNumber: number) {
    // Navegar para a rota temporária e depois para a rota correta
    this.router.navigate(['/refresh']).then(() => {
    this.router.navigate(['/home', this.urlName, 'chapters', capNumber]);
    });
  }
}
