import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelCarouselComponent } from './novel-carousel.component';

describe('NovelCarouselComponent', () => {
  let component: NovelCarouselComponent;
  let fixture: ComponentFixture<NovelCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovelCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
