import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reader-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reader-options.component.html',
  styleUrls: ['./reader-options.component.scss'],
})
export class ReaderOptionsComponent implements OnInit {
  font: string = 'Noto Sans';
  fontSize: number = 16;
  color: string = 'var(--text-light-color)';
  lineHeight: number = 2;
  style: any = {};

  @Output() styleChanges = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedStyle = localStorage.getItem('chapter-style');
      if (savedStyle) {
        this.style = JSON.parse(savedStyle);
        this.font = this.style['font-family'] || this.font;
        this.fontSize = parseInt(this.style.fontSize, 10) || this.fontSize; // Converte o valor para número
        this.color = this.style.color || this.color;
        this.lineHeight = parseFloat(this.style.lineHeight) || this.lineHeight; // Converte o valor para número
      }
    }
  }

  applyStyle(): void {
    this.style = {
      'font-family': this.font,
      fontSize: `${this.fontSize}px`,
      color: this.color,
      lineHeight: this.lineHeight.toString(),
    };

    this.styleChanges.emit(this.style);
    localStorage.setItem('chapter-style', JSON.stringify(this.style));
  }

  resetStyles(): void {
    this.font = 'Noto Sans';
    this.fontSize = 18;
    this.color = 'var(--text-light-color)';
    this.lineHeight = 1.5;
    this.applyStyle();
  }
}
