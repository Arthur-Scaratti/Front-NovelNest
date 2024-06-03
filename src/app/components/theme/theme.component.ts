import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [NgFor],
  providers: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})

export class ThemeComponent {
  isLightTheme = false;
  currentThemeClass: string = '';
  currentBaseColorClass: string = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];
  
  constructor() {}
  
  ngOnInit(): void {
  }
  
  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
  }

  onColorChange(event: any): void {
    const selectedColor = event.target.value;
  }
}
