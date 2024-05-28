import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelHeaderComponent } from './novel-header.component';

describe('NovelHeaderComponent', () => {
  let component: NovelHeaderComponent;
  let fixture: ComponentFixture<NovelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
