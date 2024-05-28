import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, NgFor],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() name?: string = '';
  @Input() description?: string = '';
  @Input() autor?: string = '';
  @Input() tags?: string[] = [];
  @Input() status?: string = '';
  @Input() nro_capitulos_en: any;

  maxLines = 15;
  expanded = false;


  getDescriptionLines() {
    if (!this.description) return [];
    return this.description.split('\n');
  }
}
