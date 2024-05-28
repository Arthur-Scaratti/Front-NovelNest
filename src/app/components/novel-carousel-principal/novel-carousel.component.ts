import { Component, Input } from '@angular/core';
import { Novelnameurl } from '../../models/novelnameurl';

@Component({
  selector: 'app-novel-carousel',
  standalone: true,
  imports: [],
  templateUrl: './novel-carousel.component.html',
  styleUrl: './novel-carousel.component.scss',
})
export class CarouselComponent {
  @Input() novels: Novelnameurl[] = [];
  leftIndex: number = 0;
  centerIndex: number = 1;
  rightIndex: number = 2;

  next() {
    this.leftIndex = (this.leftIndex + 1) % this.novels.length;
    this.centerIndex = (this.centerIndex + 1) % this.novels.length;
    this.rightIndex = (this.rightIndex + 1) % this.novels.length;
  }

  prev() {
    this.leftIndex =
      (this.leftIndex - 1 + this.novels.length) % this.novels.length;
    this.centerIndex =
      (this.centerIndex - 1 + this.novels.length) % this.novels.length;
    this.rightIndex =
      (this.rightIndex - 1 + this.novels.length) % this.novels.length;
  }
}
