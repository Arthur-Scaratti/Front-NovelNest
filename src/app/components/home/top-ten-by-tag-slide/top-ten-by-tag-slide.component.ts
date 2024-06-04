import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
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
export class TopTenByTagSlideComponent implements AfterViewInit {
  @Input() topByTags: TopByTag[] = [];
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.extractTags();
    this.filterNovelsByTag();
    this.checkDeviceWidth();

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'resize',
        this.adjustCarouselCentering.bind(this),
      );
      window.addEventListener('resize', this.checkDeviceWidth.bind(this));
    }
    if (this.carouselImages) {
      this.carouselImages.nativeElement.addEventListener(
        'wheel',
        (event: WheelEvent) => {
          event.preventDefault();
          this.carouselImages.nativeElement.scrollLeft += event.deltaY;
        },
      );
    }
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

  extractTags(): void {
    const tagsSet = new Set<string>();
    this.topByTags.forEach((topByTag) => {
      if (topByTag.tag) {
        tagsSet.add(topByTag.tag);
      }
    });
    this.tags = Array.from(tagsSet);
  }

  onTagChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const tag = target.value;
    this.selectedTag = tag;
    this.filterNovelsByTag();
    setTimeout(() => {
      this.adjustCarouselCentering();
    }, 0);
  }

  filterNovelsByTag(): void {
    const selectedTopByTag = this.topByTags.find(
      (topByTag) => topByTag.tag === this.selectedTag,
    );
    this.novels = selectedTopByTag ? selectedTopByTag.novels : [];
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

      const windowWidth = window.innerWidth;
      const tooltipWidth = 500; // approximate width of the tooltip
      const mouseX = event.clientX;
      const spaceLeft = mouseX; // available space to the left
      const spaceRight = windowWidth - mouseX; // available space to the right

      if (spaceRight >= tooltipWidth) {
        this.tooltipPosition.left = `${mouseX + 10}px`; // position to the right of the cursor
      } else if (spaceLeft >= tooltipWidth) {
        this.tooltipPosition.left = `${mouseX - tooltipWidth - 30}px`; // position to the left of the cursor
      } else {
        this.tooltipPosition.left = '10px'; // fallback: default position
      }

      this.tooltipPosition.top = `${event.clientY + 10}px`; // position below the cursor
      this.tooltipVisible = true; // show the tooltip
    }, 300); // 300 milliseconds delay before showing the tooltip
  }

  hideTooltip() {
    clearTimeout(this.hoverTimeout);
    this.tooltipVisible = false;
    this.tooltipData = null;
  }

  checkDeviceWidth() {
    this.isDesktop = typeof window !== 'undefined' && window.innerWidth >= 950; // Example breakpoint for desktop
  }
}
