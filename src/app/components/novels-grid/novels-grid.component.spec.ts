import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelsGridComponent } from './novels-grid.component';

describe('NovelsGridComponent', () => {
  let component: NovelsGridComponent;
  let fixture: ComponentFixture<NovelsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovelsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
