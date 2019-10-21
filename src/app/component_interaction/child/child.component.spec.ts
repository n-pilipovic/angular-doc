import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-host-component',
  template:  `<app-child
    [greeting]="greeting$ | async"
    [anotherGreeting]="anotherGreeting"
    (greetingEvent)="handleGreetingEvent($event)"
  ></app-child>`
})
class HostComponent {
  greeting$: Observable<string>;
  anotherGreeting: string;
  handleGreetingEvent() {}
}

describe('ChildComponent', () => {
  let component: ChildComponent;
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;
  let childDebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildComponent, HostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    childDebugElement = hostFixture.debugElement.query(By.directive(ChildComponent));
    component = childDebugElement.componentInstance;
  });

  it('should set the inputs correctly', () => {
    hostComponent.greeting$ = of('what');
    hostComponent.anotherGreeting = 'now';

    hostFixture.detectChanges();

    expect(component.greeting).toBe('what');
    expect(component.anotherGreeting).toBe('now');
  });

  it('should pass the greeting to parent component when greeting button is clicked ', () => {
    const btn = childDebugElement.query(By.css('[data-greeting-btn]')).nativeElement;
    const spy = spyOn(hostComponent, 'handleGreetingEvent');
    hostComponent.greeting$ = of('what');
    hostComponent.anotherGreeting = 'now';

    hostFixture.detectChanges();

    btn.click();

    expect(spy).toHaveBeenCalledWith('Hello, parent!');
  });

  it('should set up default value for greeting and anotherGreeting', () => {
    hostFixture.detectChanges();

    expect(component.greeting).toBe('default greeting');
    expect(component.anotherGreeting).toBe('default another greeting');
  });
});
