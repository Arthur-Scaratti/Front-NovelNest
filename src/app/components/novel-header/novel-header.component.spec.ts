import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovelHeaderComponent } from './novel-header.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NovelHeaderComponent', () => {
  let component: NovelHeaderComponent;
  let fixture: ComponentFixture<NovelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NovelHeaderComponent],
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  switch (key) {
                    case 'urlName':
                      return 'testUrlName';
                    default:
                      return null;
                  }
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NovelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
