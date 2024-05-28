import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUploadedSlideComponent } from './recent-uploaded-slide.component';

describe('RecentUploadedSlideComponent', () => {
  let component: RecentUploadedSlideComponent;
  let fixture: ComponentFixture<RecentUploadedSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentUploadedSlideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentUploadedSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
