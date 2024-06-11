import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ChapterComponent } from '../../pages/chapter/chapter.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgClass, NgFor } from '@angular/common';
import { ReaderOptionsComponent } from './reader-options/reader-options.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgClass,
    ChapterComponent,
    SideNavComponent,
    ReaderOptionsComponent,
    NgFor,
    RouterLink,
  ],
  providers: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  currentUrl: string = '';
  nextUrl: string = '';
  previousUrl: string = '';
  capNro: any;
  urlName: any;
  urlNovel: any;
  isSidebarExpanded = false;
  isOptionbarExpanded = false;
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];

  @Output() styleChanges = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavigationUrls();
      }
    });
  }

  private updateNavigationUrls() {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.capNro = parseInt(this.route.snapshot.paramMap.get('capNro') ?? '');
    this.previousUrl = this.getChapterUrl(parseInt(this.capNro, 10) - 1);
    this.nextUrl = this.getChapterUrl(parseInt(this.capNro, 10) + 1);
    this.urlNovel = this.getNovelUrl();
  }

  private getChapterUrl(capNumber: number): string {
    return `/home/${this.urlName}/chapters/${capNumber}`;
  }

  private getNovelUrl(): string {
    return `/home/${this.urlName}`;
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    if (this.isSidebarExpanded) {
      this.isOptionbarExpanded = false;
    }
  }

  toggleOptionsBar() {
    this.isOptionbarExpanded = !this.isOptionbarExpanded;
    if (this.isOptionbarExpanded) {
      this.isSidebarExpanded = false;
    }
  }

  onStyleChanges(style: any) {
    this.emitStyleChanges(style);
  }

  emitStyleChanges(style: any) {
    this.styleChanges.emit(style);
  }

  navigateToChapter(capNumber: number) {
    this.router.navigate(['/home', this.urlName, 'chapters', capNumber]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideSidebar = target.closest('.sidebar');
    const isInsideOptionsBar = target.closest('.optionsbar');
    const isToggleButton = target.closest('.toggle-button');

    if (!isInsideSidebar && !isInsideOptionsBar && !isToggleButton) {
      this.isSidebarExpanded = false;
      this.isOptionbarExpanded = false;
    }
  }
}