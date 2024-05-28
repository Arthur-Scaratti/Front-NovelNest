import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnovelComponent } from './listnovel.component';

describe('ListnovelComponent', () => {
  let component: ListnovelComponent;
  let fixture: ComponentFixture<ListnovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListnovelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListnovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
