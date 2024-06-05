import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  @Input() isLightTheme = false;
  @Input() currentBaseColorClass = '';
  availableColors: string[] = ['red', 'blue', 'green', 'purple'];
  toggleChecked = false;

  constructor() {}

  ngOnInit(): void {
    this.loadThemeFromLocalStorage();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.syncThemeWithLocalStorage.bind(this));
    }
  }

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

  syncThemeWithLocalStorage(event: StorageEvent): void {
    if (event.key === 'theme' || event.key === 'base-color') {
      this.loadThemeFromLocalStorage();
    }
  }

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    this.toggleChecked = !this.toggleChecked;
    const theme = this.isLightTheme ? 'light-mode' : '';
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  onColorChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedColor = target.value;
    this.applyBaseColor(selectedColor);
    localStorage.setItem('base-color', selectedColor);
  }

  applyTheme(theme: string): void {
    const classList = document.documentElement.classList;
    if (theme === 'light-mode') {
      classList.add('light-mode');
    } else {
      classList.remove('light-mode');
    }
  }

  applyBaseColor(color: string): void {
    const classList = document.documentElement.classList;
    classList.remove(...this.availableColors);
    classList.add(color);
  }
}
