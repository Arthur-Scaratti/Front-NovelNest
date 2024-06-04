import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovelsGridComponent } from './novels-grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NovelsGridComponent', () => {
  let component: NovelsGridComponent;
  let fixture: ComponentFixture<NovelsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, RouterTestingModule, NovelsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovelsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
