import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {

  // this is just an example of how to inject data to dialog with @angular/material/dialog
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData) { }

  ngOnInit() { }

}
