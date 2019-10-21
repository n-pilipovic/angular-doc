import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SimpleComponent } from './simple.component';
import { TrimPipe } from './pipes/trim.pipe';

@NgModule({
  // this is where we declare the components, pipes and directives that we want to use within this module
  declarations: [SimpleComponent, TrimPipe],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  providers: [],
  /* This is where we specify which components, directives, pipes or services we want to be available for any
  modules that import this module. Think of this as the module's public API */
  exports: [SimpleComponent]
})
export class SimpleModule { }
