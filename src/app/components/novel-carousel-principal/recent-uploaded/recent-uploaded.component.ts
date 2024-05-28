import { Component, Input } from '@angular/core';
import { Novelnameurl } from '../../../models/novelnameurl';

@Component({
  selector: 'app-recent-uploaded',
  standalone: true,
  imports: [],
  templateUrl: './recent-uploaded.component.html',
  styleUrl: './recent-uploaded.component.scss',
})
export class RecentUploadedComponent {
  @Input() novels: Novelnameurl[] = [];
  leftIndex: number = 0;
  leftIndex2: number = 1;
  centerIndex: number = 2;
  rightIndex: number = 3;
  rightIndex2: number = 4;
  rightIndex3: number = 5;

  next() {
    this.leftIndex = (this.leftIndex + 5) % this.novels.length;
    this.leftIndex2 = (this.leftIndex2 + 5) % this.novels.length;
    this.centerIndex = (this.centerIndex + 5) % this.novels.length;
    this.rightIndex = (this.rightIndex + 5) % this.novels.length;
    this.rightIndex2 = (this.rightIndex2 + 5) % this.novels.length;
    this.rightIndex3 = (this.rightIndex3 + 5) % this.novels.length;
  }

  prev() {
    this.leftIndex =
      (this.leftIndex - 5 + this.novels.length) % this.novels.length;
    this.leftIndex2 =
      (this.leftIndex2 - 5 + this.novels.length) % this.novels.length;
    this.centerIndex =
      (this.centerIndex - 5 + this.novels.length) % this.novels.length;
    this.rightIndex =
      (this.rightIndex - 5 + this.novels.length) % this.novels.length;
    this.rightIndex2 =
      (this.rightIndex2 - 5 + this.novels.length) % this.novels.length;
    this.rightIndex3 =
      (this.rightIndex3 - 5 + this.novels.length) % this.novels.length;
  }
}
