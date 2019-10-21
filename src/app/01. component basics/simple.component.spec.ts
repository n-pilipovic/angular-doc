import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComponent } from './simple.component';
import { SimpleService } from './services/simple.service';
import { By } from '@angular/platform-browser';

/* we use describe blocks to group tests together,
get aquianted with Jasmine here: https://jasmine.github.io/tutorials/your_first_suite */
describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;
  let simpleService: SimpleService;

  // we use async method to set up our testing environment
  beforeEach(async(() => {
    /* here we create a module that will include all the
    declarations, imports and providers we need to test SimpleComponent
    in isolation. We don't import SimpleModule, because that is a separate unit
    that should be also tested in isolation. Integration testing is not in the scope
    of this course. */
    TestBed.configureTestingModule({
      declarations: [ SimpleComponent ],
      providers: [
        /* this is how we mock services. We do this because we want to test
        the component in isolation, not the integration with SimpleService,
        so all we care about is if we react correctly to the value that comes
        from SimpleService.
        We use an empty method so that we can provide the return value dynamically,
        using Jasmine spies */
        {provide: SimpleService, useValue: {getGreeting: () => {}}}
      ]
    })
    // after this runs you can't change the configuration
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    /* this runs data binding and lifecycle hooks. if you change something in the .ts file
    and now want to see if your template correctly reflects that change, then you need to call
    fixture.detectChanges() before you expect. In this case here, we simply do this to make sure
    that the component initializes. */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the heading when name changes', () => {
    // this is how we can look for elements from the template
    const headingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    component.name = 'new name';

    // we now want to see if the change to component.name property is reflected in the template
    fixture.detectChanges();

    expect(headingElement.innerHTML).toContain('new name is my name');
  });

  it('should display the warning when displayWarning() returns true', () => {
    // this is how we can mock return values using a spy
    spyOn(component, 'displayWarning').and.returnValue(true);

    fixture.detectChanges();

    /* this time we locate the element by data-attribute. This is preferred approach,
    since now we are not tied to UI changes (moving element around, class changing etc.) */
    const warningElement = fixture.debugElement.query(By.css('[data-warning="warning"]')).nativeElement;
    expect(warningElement.innerHTML).toContain('You have been warned!');
  });

  it('should display default text when displayWarning() returns false', () => {
    spyOn(component, 'displayWarning').and.returnValue(false);

    fixture.detectChanges();

    const noWarningElement = fixture.debugElement.query(By.css('[data-no-warning="no-warning"]')).nativeElement;
    expect(noWarningElement.innerHTML).toContain('Nothing to see here!');
  });

  it('should call displayNameIndex with the correct index when user clicks on button', () => {
    const secondButtonInList = fixture.debugElement.query(By.css('[data-list-button="1"]')).nativeElement;
    const spy = spyOn(component, 'displayNameIndex');

    secondButtonInList.click();

    expect(spy).toHaveBeenCalledWith(1);
  });
});
