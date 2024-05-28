import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenByTagSlideComponent } from './top-ten-by-tag-slide.component';

describe('TopTenByTagSlideComponent', () => {
  let component: TopTenByTagSlideComponent;
  let fixture: ComponentFixture<TopTenByTagSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTenByTagSlideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopTenByTagSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
