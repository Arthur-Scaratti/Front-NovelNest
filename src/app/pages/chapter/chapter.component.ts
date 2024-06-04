import { Component } from '@angular/core';
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
  content: chapterContent | null = null;
  urlName: any;
  novelName: any;
  language: string = 'EN';
  capNro: any;
  title: any;
  previousUrl: string | null = null;
  nextUrl: string | null = null;
  styleSubscription: Subscription | undefined;
  style: any;
  styleColor: any;

  constructor(
    private apicallservice: ApicallService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.obterCapitulo();
    if (typeof window === 'object' || typeof window !== 'undefined') {
      this.style = JSON.parse(localStorage.getItem('chapter-style') ?? '{}');
    }
  }

  ngOnInit(): void {}

  obterCapitulo() {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.capNro = this.route.snapshot.paramMap.get('capNro');
    this.apicallservice
      .getChapterContent(this.urlName, this.capNro, this.language)
      .subscribe((content) => {
        if (content && content.chapterLines) {
          this.content = content;
          this.novelName = this.content?.novelName;
          this.title = this.content?.chapterTitle;

          this.previousUrl = this.getChapterUrl(parseInt(this.capNro, 10) - 1);
          this.nextUrl = this.getChapterUrl(parseInt(this.capNro, 10) + 1);
        }
      });
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
