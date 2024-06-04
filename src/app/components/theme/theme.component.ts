import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  @Input() isLightTheme = false;
  @Input() currentBaseColorClass = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];
  toggleChecked = false;

  constructor() {}

  ngOnInit(): void {
    if (typeof window === 'object' || typeof window !== 'undefined'){
    this.loadThemeFromLocalStorage();
    window.addEventListener('storage', (event) => {
      if (event.key === 'theme') {
        this.loadThemeFromLocalStorage();
      }
    });
  }}

  loadThemeFromLocalStorage(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isLightTheme = savedTheme === 'light-mode';
    }

    const savedBaseColor = localStorage.getItem('base-color');
    if (savedBaseColor) {
      this.currentBaseColorClass = savedBaseColor;
    }
  }

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    this.toggleChecked = !this.toggleChecked;
    const theme = this.isLightTheme ? 'light-mode' : '';
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  onColorChange(event: any): void {
    const selectedColor = event.target.value;
    this.applyBaseColor(selectedColor);
    localStorage.setItem('base-color', selectedColor);
  }

  applyTheme(theme: string): void {
    if (theme === 'light-mode') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }

  applyBaseColor(color: string): void {
    document.documentElement.classList.remove(...this.availableColors);
    document.documentElement.classList.add(color);
  }
}