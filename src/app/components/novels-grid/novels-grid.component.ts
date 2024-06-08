import { Component, Input, OnInit, HostListener, inject, SimpleChanges } from '@angular/core';
import { Novelnameurl } from '../../models/novelnameurl';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ApicallService } from '../../services/apicall.service';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-novels-grid',
  standalone: true,
  imports: [NgFor, NgIf, TooltipComponent, NgStyle, RouterLink],
  templateUrl: './novels-grid.component.html',
  styleUrls: ['./novels-grid.component.scss'],
})
export class NovelsGridComponent implements OnInit {
  @Input() novels: Novelnameurl[] = [];
  @Input() tagParam: string = '';
  apicallservice = inject (ApicallService);
  filteredNovels: Novelnameurl[] = [];
  selectedLetter: string | null = '';
  selectedTag: string | null = '';
  tags: string[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  gridTemplateRows?: string;
  tooltipVisible: boolean = false;
  tooltipData: {
    name: string;
    description: string;
    autor: string;
    tags: string[];
    status: string;
    nro_capitulos_en: number | string;
  } | null = null;
  tooltipPosition: { top: string; left: string } = { top: '0px', left: '0px' };
  hoverTimeout: any;
  isDesktop: boolean = true;

  constructor() {this.filteredNovels = this.novels;}

  ngOnInit() {
    this.filteredNovels = this.novels;
    this.filterNovelsByParam(this.tagParam);
    this.calculateRows();
    this.fetchTags();
    this.checkDeviceWidth();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredNovels = this.novels;
    
  }
  
  @HostListener('window:resize')
  onResize() {
    this.checkDeviceWidth();
  }

  checkDeviceWidth() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 950;
    }
  }

  filterNovels() {
    this.filteredNovels = this.novels.filter((novel) => {
      const matchesLetter = !this.selectedLetter || novel.name.startsWith(this.selectedLetter);
      const matchesTag = !this.selectedTag || novel.tags.includes(this.selectedTag);
      return matchesLetter && matchesTag;
    });
    this.calculateRows();
  }

  filterNovelsByLetter(letter: string) {
    this.selectedLetter = this.selectedLetter === letter ? null : letter;
    this.filterNovels();
  }

  filterNovelsByParam(tag: string | null) {
    this.filterNovelsByTag(tag);
  }

  filterNovelsByTag(tag: string | null) {
    this.selectedTag = this.selectedTag === tag ? null : tag;
    this.filterNovels();
  }

  calculateRows() {
    const itemCount = this.filteredNovels.length;
    let rows = Math.floor(itemCount / 5);
    if (itemCount % 5 !== 0) {
      rows += 1;
    }
    this.gridTemplateRows = `repeat(${rows}, 1fr)`;
  }

  fetchTags() {
    this.apicallservice.getTags().subscribe((tags) => {
      this.tags = tags.map((tag) => tag.tag_name);
    });
  }

  showTooltip(novel: Novelnameurl, event: MouseEvent) {
    if (!this.isDesktop) return;

    this.hoverTimeout = setTimeout(() => {
      this.tooltipData = {
        name: novel.name || 'No name available',
        description: novel.description || 'No description available',
        autor: novel.autor || 'Unknown',
        tags: novel.tags || [],
        status: novel.status || 'Unknown',
        nro_capitulos_en: novel.nro_capitulos_en || 'Unknown',
      };

      this.setTooltipPosition(event);
      this.tooltipVisible = true;
    }, 300);
  }

  setTooltipPosition(event: MouseEvent) {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      const tooltipWidth = 500; 
      const mouseX = event.clientX;
      const spaceLeft = mouseX; 
      const spaceRight = windowWidth - mouseX; 

      if (spaceRight >= tooltipWidth) {
        this.tooltipPosition.left = `${mouseX + 10}px`; 
      } else if (spaceLeft >= tooltipWidth) {
        this.tooltipPosition.left = `${mouseX - tooltipWidth - 30}px`; 
      } else {
        this.tooltipPosition.left = '10px';
      }

      this.tooltipPosition.top = `${event.clientY + 10}px`; 
    }
  }

  hideTooltip() {
    clearTimeout(this.hoverTimeout);
    this.tooltipVisible = false;
    this.tooltipData = null;
  }
}
