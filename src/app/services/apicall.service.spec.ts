import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApicallService } from './apicall.service';

describe('ApicallService', () => {
  let service: ApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ApicallService] // Provide the service
    });
    service = TestBed.inject(ApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
