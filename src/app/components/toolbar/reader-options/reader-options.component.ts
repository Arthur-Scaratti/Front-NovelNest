import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reader-options',
  standalone: true,
  imports: [FormsModule],
  providers: [],
  templateUrl: './reader-options.component.html',
  styleUrl: './reader-options.component.scss',
})
export class ReaderOptionsComponent {
  font: string = 'Noto Sans';
  fontSize: any;
  color: string = 'white';
  lineHeight: string = '1.5';
  style: any;
  constructor() {}

  @Output() styleChanges = new EventEmitter<any>();
  ngOnInit(): void {
    if (typeof window === 'object' || typeof window !== 'undefined') {
      this.style = JSON.parse(localStorage.getItem('chapter-style') ?? '{}');

      // Atribuir as propriedades do objeto style para as variáveis correspondentes
      this.font = this.style['font-family'];
      this.fontSize = parseInt(this.style.fontSize); // Remove 'px' do final do valor do fontSize
      this.color = this.style.color;
      this.lineHeight = this.style.lineHeight;
    }
  }

  applyStyle() {
    this.style = {
      'font-family': this.font,
      fontSize: this.fontSize + 'px', // Adiciona 'px' ao final do valor do fontSize
      color: this.color,
      lineHeight: this.lineHeight,
    };

    this.styleChanges.emit(this.style);
  }

  resetStyles() {
    this.font = 'Open Sans';
    this.fontSize = '20px';
    this.color = 'white';
    this.lineHeight = '1.5';
    this.applyStyle();
  }
}
