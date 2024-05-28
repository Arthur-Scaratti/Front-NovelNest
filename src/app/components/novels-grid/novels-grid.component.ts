import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Novelnameurl } from '../../models/novelnameurl';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ApicallService } from '../../services/apicall.service';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-novels-grid',
  standalone: true,
  imports: [NgFor, NgIf ,TooltipComponent, NgStyle, RouterLink],
  templateUrl: './novels-grid.component.html',
  styleUrls: ['./novels-grid.component.scss'],
})
export class NovelsGridComponent implements OnInit {
  @Input() novels: Novelnameurl[] = [];
  filteredNovels: Novelnameurl[] = [];
  
  selectedLetter: string | null = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  gridTemplateRows?: string;
  @Input() tagParam: string = '';
  selectedTag: string | null = '';
  tags: string[] = [];

  tooltipVisible: boolean = false;
  tooltipData: { name: string, description: string, autor: string, tags: string[], status: string, nro_capitulos_en: number | string} | null = null;
  tooltipPosition: { top: string, left: string } = { top: '0px', left: '0px' };
  hoverTimeout: any;
  isDesktop: boolean = true;

  constructor(private apicallservice: ApicallService, private router: Router) {
    
  }

  ngOnInit() {
    this.filteredNovels = this.novels;
    this.calculateRows();
    this.obterTags();
    this.checkDeviceWidth();
    this.filterNovelsByParam(this.tagParam);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDeviceWidth();
  }

  checkDeviceWidth() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 950; // Example breakpoint for desktop
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

  filterNovelsByParam (tag: string | null){
   this.filterNovelsByTag(tag);
  }

  filterNovelsByTag(tag: string | null) {
    this.selectedTag = this.selectedTag === tag ? null : tag;
    this.filterNovels();
  }

  calculateRows() {
    const itemCount = this.novels.length;
    let rows = Math.floor(itemCount / 5);
    if (itemCount % 5 !== 0) {
      rows += 1;
    }
    this.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
  }

  obterTags() {
    this.apicallservice.getTags().subscribe((tags) => {
      this.tags = tags.map(tag => tag.tag_name);
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

      if (typeof window !== 'undefined') {
        // Calcula a posição baseada na largura da janela e na posição do cursor
        const windowWidth = window.innerWidth;
        const tooltipWidth = 500; // largura aproximada do tooltip
        const mouseX = event.clientX;
        const spaceLeft = mouseX; // espaço disponível à esquerda
        const spaceRight = windowWidth - mouseX; // espaço disponível à direita

        if (spaceRight >= tooltipWidth) {
          this.tooltipPosition.left = `${mouseX + 10}px`; // posiciona à direita do cursor
        } else if (spaceLeft >= tooltipWidth) {
          this.tooltipPosition.left = `${mouseX - tooltipWidth - 30}px`; // posiciona à esquerda do cursor
        } else {
          this.tooltipPosition.left = '10px'; // fallback: posição padrão
        }

        this.tooltipPosition.top = `${event.clientY + 10}px`; // posiciona abaixo do cursor
      }
      this.tooltipVisible = true; // exibe o tooltip
    }, 300); // 300ms de delay antes de mostrar o tooltip
  }

  hideTooltip() {
    clearTimeout(this.hoverTimeout);
    this.tooltipVisible = false;
    this.tooltipData = null;
  }
}
