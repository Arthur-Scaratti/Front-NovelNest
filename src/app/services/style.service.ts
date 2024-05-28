import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private styleSource = new BehaviorSubject({
    font: 'Arial',
    fontSize: '16px',
    color: '#000000',
    lineHeight: '1.5',
  });

  styleChanged = new EventEmitter<any>();

  constructor() {}

  changeStyle(
    font: string,
    fontSize: string,
    color: string,
    lineHeight: string,
  ) {
    this.styleSource.next({ font, fontSize, color, lineHeight });
    console.log(font);
    console.log(fontSize);
    console.log(color);
    console.log(lineHeight);
    this.styleChanged.emit({ font, fontSize, color, lineHeight });
  }
  currentStyle = this.styleSource.asObservable();
}
