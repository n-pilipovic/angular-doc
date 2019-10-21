import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponent } from './parent.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/* This is how we mock a child component, we have to make sure that the selector
and inputs/outputs match what the parent component expects. If you'd like to,
you could also supress child component (and other template) errors
by adding schemas: [NO_ERRORS_SCHEMA] to the TesBed module, but do be careful as you will
support all other template errors as well. Though this can be effective approach if you
want to only test the logic inside the TypeScript files */
@Component({
  selector: 'app-child',
  template: ''
})
class ChildMockComponent {
  @Input() greeting;
  @Input() anotherGreeting;
  @Output() greetingEvent = new EventEmitter();
}

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildMockComponent,
        ParentComponent,
        SimpleDialogComponent
      ],
      // schemas: [NO_ERRORS_SCHEMA], // another way to supress template errors without mocking components
      providers: [
        {provide: MatDialog, useValue: {open: () => {}}}
      ]
    })
    /* This here is to illustrate how to provide entryComponents array to the TestBed.
    Also beware that once you have called compileComponents, you are no longer able
    to override. If you every need to do so then one option is to write the TestBed.configureTestingModule call
    into a function, which you would then call with the arguments required to configure your testing bed correctly
    for each test case. */
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SimpleDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a material dialog window when user clicks on open dialog button', () => {
    const btn = fixture.debugElement.query(By.css('[data-dialog-btn]')).nativeElement;
    /* This is an example of how to access private properties. This is an intentional loophole
    that was left in by TS for cases where you really need to have access to the property,
    but don't want to set the property to public. Though you probably would need to disable
    the linter rule for either each line or in tsconfig.json */
    const spy = spyOn(component['dialog'], 'open');
    btn.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
