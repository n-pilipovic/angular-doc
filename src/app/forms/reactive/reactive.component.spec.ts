import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveComponent } from './reactive.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ReactiveComponent', () => {
  let component: ReactiveComponent;
  let fixture: ComponentFixture<ReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveComponent ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when name already exists', () => {
    // benefit of reactive forms is that we can effectively bypass template when cosntructing test case
    component.names.add('toomastoomas');
    component.namesForm.setValue({firstName: 'toomas', lastName: 'toomas'});

    component.addName(); // we can simply submit the form by calling the method
    fixture.detectChanges();

    const error = getElement('[data-name-exists-error]');
    expect(error).toBeTruthy();
  });

  it('should display error when name is touched but not provided', () => {
    component.namesForm.get('firstName').markAsTouched();

    fixture.detectChanges();
    const error = getElement('[data-first-name-required-error]');

    expect(error).toBeTruthy();
  });

  function getElement(selector: string) {
    return fixture.debugElement.query(By.css(selector));
  }
});
