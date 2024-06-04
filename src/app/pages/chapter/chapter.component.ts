import { Component, inject } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { chapterContent } from '../../models/chaptercontent';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { Subscription } from 'rxjs';
import { NgStyle } from '@angular/common';
import { CommentsComponent } from '../../components/comments/comments.component';

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
  capNro: string = this.route.snapshot.paramMap.get('capNro') ?? '';
  // redundância pra correção de bug onde ele não buscava o nro do capitulo corretamente
  capNro$ = this.obterCapitulo.bind(this);
  language: string = 'EN';
  
  api$ = (typeof window !== 'undefined' && this.urlName) ? 
  this.apicallservice
    .getChapterContent(this.urlName, this.capNro$(), this.language)
    .subscribe((content) => {
      if (content && content.chapterLines) {
        this.content = content;
        this.novelName = this.content?.novelName;
        this.title = this.content?.chapterTitle;

        this.previousUrl = this.getChapterUrl(this.capNro$() - 1);
        this.nextUrl = this.getChapterUrl(this.capNro$() + 1);
      }
    }) : null;

  constructor() { this.obterCapitulo(); }

  obterCapitulo(): number {
    this.capNro = this.route.snapshot.paramMap.get('capNro') ?? '';
    return parseInt(this.capNro);
  }

  private getChapterUrl(capNumber: number): string {
    return `/home/${this.urlName}/chapters/${capNumber}`;
  }

  onStyleChanges(style: any) {
    this.style = style;
    localStorage.setItem('chapter-style', JSON.stringify(style));
    console.log(this.style);
  }
}
