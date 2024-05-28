import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexnovelComponent } from './indexnovel.component';

describe('IndexnovelComponent', () => {
  let component: IndexnovelComponent;
  let fixture: ComponentFixture<IndexnovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexnovelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexnovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
