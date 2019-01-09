import { TestBed, inject } from '@angular/core/testing';

import { NotificationHelperService } from './notification-helper.service';

describe('NotificationHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationHelperService]
    });
  });

  it('should be created', inject([NotificationHelperService], (service: NotificationHelperService) => {
    expect(service).toBeTruthy();
  }));
});
