import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { ApicallService } from './services/apicall.service';
import { ViewportScroller } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppComponent], // Add AppComponent to imports
      providers: [
        ApicallService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}) // Mock any necessary route parameters here
          }
        },
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(0, '', ''))
          }
        },
        ViewportScroller
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
