import { TestBed } from '@angular/core/testing';

import { OnlineGameplayService } from './online-gameplay.service';

describe('OnlineGameplayService', () => {
  let service: OnlineGameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineGameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
