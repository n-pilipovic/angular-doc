import { TestBed, async } from '@angular/core/testing';

import { SimpleService } from './simple.service';

describe('SimpleService', () => {
  let service: SimpleService;

  beforeEach(async(() => {
    /* same case as with testing components, we build our own test module,
    which we populate with all the services, components, imported modules etc.
    that are needed for our test to run. Currently SimpleService does not have any
    dependencies, so we can simply pass in an empty object.

    We could test it in complete isolation, as we did with UppercaseAndTrim pipe, but
    this just shows that you can initialize it like this as well. One benefit of this is
    that it does not require rework (though it is minimal) when the service will eventually grow. */
    TestBed.configureTestingModule({});
  }));

  beforeEach(() => {
    service = TestBed.get(SimpleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* wrapping our getGreeting related tests into a separate describe block is not necessary,
  but rather a convention to make your Karma output and spec file more readable */
  describe('getGreeting method', () => {
    it('should return greeting', () => {
      expect(service.getGreeting()).toEqual('hello');
    });
  });
});
