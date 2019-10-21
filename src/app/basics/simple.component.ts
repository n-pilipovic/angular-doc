import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SimpleService } from './services/simple.service';

/* @Component is a decorator. Decorators are used to provide metadata about whatever follows.
  If you want to get into decorators really deep, like uncomfortably so, then follow these links
  (totally optional and best to do this after the course):
    https://www.youtube.com/watch?v=GCraGHx6gso (pattern itself)
    https://ultimatecourses.com/blog/angular-decorators */
@Component({
  /* this is what you use when you want to use this component in the UI.
  You can change the app prefix in angular.json projects -> example -> prefix */
  selector: 'app-simple-component',
  // this is where your fancy HTML lives. You can inline this as a string using template property
  templateUrl: './simple.component.html',
  // this is where your pretty CSS lives. You can inline this as a string using styles property
  styleUrls: ['./simple.component.scss'],
  /* This modifies something truly awesome depending on how much you were abused by CSS.
    Remember how every style rule in CSS is global and it can suck, like a lot? View encapsulation sorts this out for you,
    it makes sure that whatever you write in your component's .scss file, it stays unique, so you don't have to
    worry about BEM or any other systematic way of trying to make sure your style rules don't collide.
    You can turn it off, if you want to be adventurous (or use Shadow DOM) */
  encapsulation: ViewEncapsulation.Emulated
})
export class SimpleComponent implements OnInit {
  /* this is how you declare a class property and type it. You can use TypeScripts access modifiers
  private, public, protected or readonly, just beware that they probably don't mean exactly what you think they mean
  (read more: https://stackoverflow.com/questions/37506343/private-and-public-in-angular-component) and they can cause unexpected issues,
  like when you want to use protected property in template and do ahead-of-time compiling. */
  name = 'dummy name';
  dynamicName: string; // here TS can't infer the type from the value we assign, so we type it explicitly
  names = ['Thomas', 'Sarah', 'Jack', 'Barielle'];

  /* We inject the dependencies we want our component to use via the constructor. Since it is a language, not a framework concept,
  it is recommended that instead you do initialization logic in ngOnInit lifecycle hook (or ngOnChanges,
  but more on that in component interaction). In that case you can be sure that the component has initialized
  and you have access to everything. It is recommended to use constructor only for dependency injection.
      Read more: https://ultimatecourses.com/blog/angular-constructor-ngoninit-lifecycle-hook#Differences_between_constructor_and_OnInit
    Also remember that we need to add a access modifier (private, public, protected etc.) before the constructor argument
    so that a class property is created. If you forgot this then it would be handled as a regular parameter to a function. */
  constructor(
    /* SimpleService is a custom Service that we created. This is how we inject it into our component so that we can use it. */
    private simpleService: SimpleService,
  ) { }

  /* this is a lifecycle hook. Wwe have a separate component that goes into more depth, but right now
  all you need to know is that this method runs when Angular has finished creating the component. */
  ngOnInit(): void {
    /* it is fine to set static values (that can behave as default values also) to properties
    but whenever you need to set them from or based on any dependencies you injected then 
    you should do so in this method. */
    this.dynamicName = this.simpleService.getGreeting();
  }

  /* this is how you create a method and provide it's return type. We use this method in the template. It is suggested
  to read up on ES6 classes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes and also why
  they are not real classes: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/this-object-prototypes/apA.md */
  displayWarning(): boolean {
    return false;
  }

  /* return type void means that nothing is returned. We use this method from the template. */
  displayNameIndex(index: number): void {
    console.log('User clicked on name that has index of ', index);
  }
}
