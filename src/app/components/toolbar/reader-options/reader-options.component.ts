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
  fontSize: any = "16";
  color: string = 'var(--text-light-color)';
  lineHeight: string = '2';
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
    this.font = 'Noto Sans';
    this.fontSize = '18';
    this.color = 'var(--text-light-color)';
    this.lineHeight = '2';
    this.applyStyle();
  }
}
