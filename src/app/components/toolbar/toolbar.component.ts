import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ChapterComponent } from '../../pages/chapter/chapter.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgClass, NgFor } from '@angular/common';
import { ReaderOptionsComponent } from './reader-options/reader-options.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgClass,
    ChapterComponent,
    SideNavComponent,
    ReaderOptionsComponent,
    NgFor
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
  partesmin: string[] = [];
  partes: string[] = [];
  isSidebarExpanded = false;
  isOptionbarExpanded = false;
  styles: any;
  isLightTheme = false;
  currentThemeClass: string = '';
  currentBaseColorClass: string = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlName = this.route.snapshot.paramMap.get('urlName');
        this.capNro = this.route.snapshot.paramMap.get('capNro');
        this.previousUrl = this.getChapterUrl(parseInt(this.capNro, 10) - 1);
        this.nextUrl = this.getChapterUrl(parseInt(this.capNro, 10) + 1);
        this.urlNovel = this.getNovelUrl();
      }
    });
  }
  @Output() styleChanges = new EventEmitter<any>();

  private getChapterUrl(capNumber: number): string {
    return `/home/${this.urlName}/chapters/${capNumber}`;
  }

  private getNovelUrl() {
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
    this.emittStyleChanges(style);
  }

  emittStyleChanges(style: any) {
    this.styleChanges.emit(style);
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
