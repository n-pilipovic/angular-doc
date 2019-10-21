import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [ChildComponent, SimpleDialogComponent, ParentComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  /* This is where we register all of the components that we do not reference in a template,
  but rather within our .ts files. In this case we want to open the dialog window (SimpleDialogComponent)
  when the user clicks a button. */
  entryComponents: [SimpleDialogComponent],
  exports: [
    ParentComponent
  ]
})
export class ComponentInteractionModule { }
