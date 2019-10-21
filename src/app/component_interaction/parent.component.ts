import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  greeting = 'Maybe React for job security?';
  anotherGreeting = 'I still love you. Even if you like React';

  /* We suffix Observabels with $ by convention.
  RxJS is not the main focus of this course, but right now think of them as a stream from where
  you can get data over time. There are additional resources provided about RxJS in the topmost readme file */
  observable$: Observable<string> = of('Aranea seems like a good idea');

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleChildGreeting(greeting: string): void {
    console.log('child greeted us with ', greeting);
  }

  openDialog() {
    /* This is a simple example of how we could consume a component
    without referencing it inside a template */
    this.dialog.open(SimpleDialogComponent);
  }
}
