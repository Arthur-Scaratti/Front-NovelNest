/*import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {Novelnameurl} from '../../models/novelnameurl';
import { Subscription, timer } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-novel-carousel',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './novel-carousel.component.html',
  styleUrl: './novel-carousel.component.scss'
})
export class NovelCarouselComponent {
  @Input() novels: Novelnameurl[] = [];
  left = 0;
  novelName: any;
  constructor(private cdr: ChangeDetectorRef) {}

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
}
 */
