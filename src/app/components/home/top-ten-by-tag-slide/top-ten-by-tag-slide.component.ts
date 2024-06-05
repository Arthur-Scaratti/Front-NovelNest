import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Novelnameurl, TopByTag } from '../../../models/novelnameurl';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TooltipComponent } from '../../tooltip/tooltip.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-ten-by-tag-slide',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, TooltipComponent, RouterLink],
  templateUrl: './top-ten-by-tag-slide.component.html',
  styleUrls: ['./top-ten-by-tag-slide.component.scss'],
})
export class TopTenByTagSlideComponent implements AfterViewInit, OnDestroy {
  @Input() topByTags: TopByTag[] = [];
  cdr = inject (ChangeDetectorRef);
  tags: string[] = [];
  selectedTag: string = 'Action';
  novels: Novelnameurl[] = [];

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

  @ViewChild('carouselImages') carouselImages!: ElementRef;
  left = 0;

  isDesktop: boolean = true;
  readonly TOOLTIP_WIDTH: number = 500;
  readonly TOOLTIP_DELAY: number = 300;

  constructor() {}

  ngAfterViewInit() {
    this.initializeComponent();
    this.extractTags();
    this.filterNovelsByTag();
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }

  initializeComponent() {
    
    this.checkDeviceWidth();
    this.addEventListeners();
    this.addWheelEventListener();
  }
  addEventListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.adjustCarouselCentering.bind(this));
      window.addEventListener('resize', this.checkDeviceWidth.bind(this));
    }
  }
  removeEventListeners() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.adjustCarouselCentering.bind(this));
      window.removeEventListener('resize', this.checkDeviceWidth.bind(this));
    }
  }
  addWheelEventListener() {
    if (this.carouselImages) {
      this.carouselImages.nativeElement.addEventListener('wheel', this.onWheelScroll.bind(this));
    }
  }

  onWheelScroll(event: WheelEvent) {
    event.preventDefault();
    this.carouselImages.nativeElement.scrollLeft += event.deltaY;
  }

  adjustCarouselCentering() {
    if (this.carouselImages) {
      const carouselWidth = this.carouselImages.nativeElement.scrollWidth;
      const containerWidth = this.carouselImages.nativeElement.offsetWidth;

      if (carouselWidth <= containerWidth) {
        this.carouselImages.nativeElement.classList.add('center');
      } else {
        this.carouselImages.nativeElement.classList.remove('center');
      }
    }
  }

  moveLeft() {
    if (this.left < 0) {
      this.left += 200;
      this.cdr.detectChanges();
    }
  }

  moveRight() {
    if (this.left > -200 * (this.novels.length - 3)) {
      this.left -= 200;
      this.cdr.detectChanges();
    }
  }

  extractTags() {
    const tagsSet = new Set<string>();
    this.topByTags.forEach(topByTag => {
      if (topByTag.tag) {
        tagsSet.add(topByTag.tag);
      }
    });
    this.tags = Array.from(tagsSet);
  }

  onTagChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTag = target.value;
    this.filterNovelsByTag();
    setTimeout(() => {
      this.adjustCarouselCentering();
    }, 0);
  }

  filterNovelsByTag() {
    const selectedTopByTag = this.topByTags.find(topByTag => topByTag.tag === this.selectedTag);
    this.novels = selectedTopByTag ? selectedTopByTag.novels : [];
  }

  showTooltip(novel: Novelnameurl, event: MouseEvent) {
    if (!this.isDesktop) return;

    this.hoverTimeout = setTimeout(() => {
      this.setTooltipData(novel);
      this.setTooltipPosition(event);
      this.tooltipVisible = true;
    }, this.TOOLTIP_DELAY);
  }

  setTooltipData(novel: Novelnameurl) {
    this.tooltipData = {
      name: novel.name || 'No name available',
      description: novel.description || 'No description available',
      autor: novel.autor || 'Unknown',
      tags: novel.tags || [],
      status: novel.status || 'Unknown',
      nro_capitulos_en: novel.nro_capitulos_en || 'Unknown',
    };
  }

  setTooltipPosition(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const mouseX = event.clientX;
    const spaceLeft = mouseX;
    const spaceRight = windowWidth - mouseX;

    if (spaceRight >= this.TOOLTIP_WIDTH) {
      this.tooltipPosition.left = `${mouseX + 10}px`;
    } else if (spaceLeft >= this.TOOLTIP_WIDTH) {
      this.tooltipPosition.left = `${mouseX - this.TOOLTIP_WIDTH - 30}px`;
    } else {
      this.tooltipPosition.left = '10px';
    }

    this.tooltipPosition.top = `${event.clientY + 10}px`;
  }

  hideTooltip() {
    clearTimeout(this.hoverTimeout);
    this.tooltipVisible = false;
    this.tooltipData = null;
  }

  checkDeviceWidth() {
    this.isDesktop = typeof window !== 'undefined' && window.innerWidth >= 950;
  }
}
