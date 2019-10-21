import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnChanges {
  private _anotherGreeting: string;

  /* @Input is a decorator we use to mark any property we expect our parent to pass as input.
  Take a look at ngOnChanges for more details how to handle this. */
  @Input() greeting;

  /* Another way to handle an input without the ngOnChanges hook is to use a setter */
  @Input() set anotherGreeting(value: string) {
    if (!value) {
      this.anotherGreeting = 'default another greeting';
    } else {
      this._anotherGreeting = value;
    }
  }

  // since the property _test is private we would also need a getter if we wan't to access it from the template
  get anotherGreeting() {
    return this._anotherGreeting;
  }

  /* You can use EventEmitter to pass data to parent component. It creates a custom event by the same name (greetingEvent).
  There is an example of it in the component template */
  @Output() greetingEvent = new EventEmitter<string>(); // added Event suffix to be very explicit about what it is, it is not a convention

  constructor() { }

  sendGreeting() {
    this.greetingEvent.next('Hello, parent!');
  }

  /* ngOnChanges lifecycle hook runs every time the input property changes. This means that it is the very first lifecycle hook
  that runs as Angular sets input properties during component initialization. If you need to set default values for an Input property
  and it is not a setter, then do so in ngOnChanges hook */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.greeting.currentValue) {
      this.greeting = 'default greeting';
    }
  }
}
