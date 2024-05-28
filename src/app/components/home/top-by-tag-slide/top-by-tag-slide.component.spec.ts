import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopByTagSlideComponent } from './top-by-tag-slide.component';

describe('TopByTagSlideComponent', () => {
  let component: TopByTagSlideComponent;
  let fixture: ComponentFixture<TopByTagSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopByTagSlideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopByTagSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
