import { TrimPipe } from './trim.pipe';

describe('UpperCaseAndTrimPipe', () => {
  let pipe: TrimPipe;

  /* here we do not need to configure a TestBed because the pipe has no dependencies
  and thus we can test it in isolation by simply constructing a new instance for each test */
  beforeEach(() => {
    pipe = new TrimPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should trim the name', () => {
      const name = ' hello world ';
      const result = 'HELLO WORLD';

      expect(pipe.transform(name)).toBe(result);
    });
  });
});
