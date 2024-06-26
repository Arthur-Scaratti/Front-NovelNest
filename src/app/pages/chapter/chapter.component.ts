import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { chapterContent } from '../../models/chaptercontent';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { Observable, Subscription, map } from 'rxjs';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { CommentsComponent } from '../../components/comments/comments.component';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [RouterLink, ToolbarComponent, NgStyle, CommentsComponent, NgIf, CommonModule],
  providers: [ApicallService],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  apicallservice = inject (ApicallService);
  router = inject (Router);
  route = inject (ActivatedRoute);
  content$: Observable<chapterContent | null> | undefined;
  novelName: any;
  title: any;
  previousUrl: string | null = null;
  nextUrl: string | null = null;
  styleSubscription: Subscription | undefined;
  styleColor: any;
  style: any = typeof window === 'object' || typeof window !== 'undefined' ? 
  JSON.parse(localStorage.getItem('chapter-style') ?? '{}') : {};
  urlName: string | null = (this.route.snapshot.paramMap.get('urlName'));
  capNro: any;
  language: string = 'EN';
  routeSubscription: Subscription | undefined;

  constructor() {}
  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.urlName = params.get('urlName');
      this.obterCapitulo();
      console.log('passei no subscription')
    });
  }
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
  obterCapitulo(): void {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.capNro = parseInt(this.route.snapshot.paramMap.get('capNro') ?? '');
    this.content$ = this.apicallservice
    .getChapterContent(this.urlName, this.capNro, this.language)
    .pipe(map((content) => {
      if (content && content.chapterLines) {
        this.novelName = content?.novelName;
        this.title = content?.chapterTitle;

        this.previousUrl = this.getChapterUrl(this.capNro - 1);
        this.nextUrl = this.getChapterUrl(this.capNro + 1);
        return content;
      }
      return null;
    }));
  }

  private getChapterUrl(capNumber: number): string {
    return `/home/${this.urlName}/chapters/${capNumber}`;
  }

  navigateToChapter(capNumber: number) {
    this.router.navigate(['/home', this.urlName, 'chapters', capNumber]);
  }

  onStyleChanges(style: any) {
    this.style = style;
    localStorage.setItem('chapter-style', JSON.stringify(style));
    console.log(this.style);
  }
}
