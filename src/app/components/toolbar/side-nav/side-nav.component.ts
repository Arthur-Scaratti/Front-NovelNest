import { Component, ElementRef, AfterViewChecked, QueryList, ViewChildren, OnChanges, SimpleChanges, inject, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../../staples/breadcrumb/breadcrumb.component';
import { ApicallService } from '../../../services/apicall.service';
import { HttpClient } from '@angular/common/http';
import { ListChapters } from '../../../models/listchapters';
import { NgClass, NgFor } from '@angular/common';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, NgClass, NgFor],
  providers: [ApicallService, HttpClient],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements AfterViewChecked, OnChanges, OnDestroy {
  router = inject (Router);
  apicallservice = inject (ApicallService);
  route = inject (ActivatedRoute);

  private routeSubscription: Subscription | undefined;
  private chapterSubscription: Subscription | undefined;

  chapters?: ListChapters[] = [];
  novelName?: string = '';
  urlName: any;
  language: any;
  capNro = '';

  @ViewChildren('chapterItem') chapterItems!: QueryList<ElementRef>;
  private shouldScrollToChapter = false;

  constructor() {
    this.capNro = this.route.snapshot.paramMap.get('capNro') ?? '';
    this.urlName = this.route.snapshot.paramMap.get('urlName');
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
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.chapterSubscription) {
      this.chapterSubscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.obterCapitulos();
  }
  obterCapitulos() {
    this.chapterSubscription = this.apicallservice.getChapters(this.urlName).subscribe((chapters) => {
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
  scrollAdjustOnClick(capNro: number) {
    setTimeout(() => {
      const currentChapterElement = this.chapterItems.find(
        item => item.nativeElement.dataset.capnro == capNro - 1
      );
      if (currentChapterElement) {
        currentChapterElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 300); 
  }
  navigateToChapter(capNumber: number) {
    this.router.navigate(['/home', this.urlName, 'chapters', capNumber]);
    this.scrollAdjustOnClick(capNumber);
  }
}
