import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  novelName: string = '';

  constructor() {}
  setNovelName(name: string): void {
    this.novelName = name;
  }

  getNovelName(): string {
    console.log(this.novelName);
    return this.novelName;
  }
}
