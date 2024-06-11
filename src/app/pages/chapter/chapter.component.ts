import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { ActivatedRoute, RouterLink, Router, NavigationEnd } from '@angular/router';
import { chapterContent } from '../../models/chaptercontent';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { Subscription, filter } from 'rxjs';
import { NgStyle } from '@angular/common';
import { CommentsComponent } from '../../components/comments/comments.component';
import { SimpleChange } from '@angular/core';
@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [RouterLink, ToolbarComponent, NgStyle, CommentsComponent],
  providers: [ApicallService],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  apicallservice = inject (ApicallService);
  router = inject (Router);
  route = inject (ActivatedRoute);
  content: chapterContent | null = null;
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
    this.apicallservice
    .getChapterContent(this.urlName, this.capNro, this.language)
    .subscribe((content) => {
      if (content && content.chapterLines) {
        this.content = content;
        this.novelName = this.content?.novelName;
        this.title = this.content?.chapterTitle;

        this.previousUrl = this.getChapterUrl(this.capNro - 1);
        this.nextUrl = this.getChapterUrl(this.capNro + 1);
      }
    });

  }

  private getChapterUrl(capNumber: number): string {
    return `/home/${this.urlName}/chapters/${capNumber}`;
  }

  navigateToChapter(capNumber: number) {
    // Navegar para a rota temporária e depois para a rota correta
    this.router.navigate(['/refresh']).then(() => {
    this.router.navigate(['/home', this.urlName, 'chapters', capNumber]);
    });
  }

  onStyleChanges(style: any) {
    this.style = style;
    localStorage.setItem('chapter-style', JSON.stringify(style));
    console.log(this.style);
  }
}
