import { Pipe, PipeTransform } from '@angular/core';

/*
  Pipes are classes that implement PipeTransform and expose a transform property.
  Angular provides built in pipes, which you can find here: https://angular.io/guide/pipes#built-in-pipes,
  but knowing how to build and implement your own pipes is very important, as it can help us improve
  the speed of our application.
  Every time we have an expression in our template, it gets evaluated when change detection runs. By using
  a pure pipe it will get evaluated only if there is a pure change to the input values, meaning a change to either
  the primitive value or object reference (just chaning an object property does not trigger the pipe).

  You can read more about pipes here:
  - https://angular.io/guide/pipes
*/
@Pipe({
  name: 'trim',
  pure: true // this is default value, just setting it here to be explicit
})
export class TrimPipe implements PipeTransform {

  transform(name: string, ...args: any[]): any {
    return name.trim().toUpperCase();
  }
}
