import { Injectable } from '@angular/core';

/* The @Injectable decorator is how we let Angular know that we want to register
this as a dependency that we can inject through the constructor */
@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  constructor() { }

  getGreeting(): string {
    return 'hello';
  }
}
