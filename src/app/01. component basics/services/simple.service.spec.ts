import { TestBed } from '@angular/core/testing';

import { SimpleService } from './simple.service';

describe('SimpleService', () => {
  let service: SimpleService;

  beforeEach(() => {
    /* same case as with testing components, we build our own test module,
    which we populate with all the services, components, imported modules etc.
    that are needed for our test to run. Currently SimpleService does not have any
    dependencies, so we can simply pass in an empty object. */
    TestBed.configureTestingModule({});
    // we assign a reference to SimpleService to the service variable so we can use it in test cases
    service = TestBed.get(SimpleService);
  });

  /* the test cases for SimpleService are, well, simple */
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
