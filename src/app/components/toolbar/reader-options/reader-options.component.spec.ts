import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderOptionsComponent } from './reader-options.component';

describe('ReaderOptionsComponent', () => {
  let component: ReaderOptionsComponent;
  let fixture: ComponentFixture<ReaderOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReaderOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
