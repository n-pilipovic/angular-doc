import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpAndRoutingComponent } from './http_and_routing/http-and-routing.component';

/* This is the root module of our application. Every other module that we create
is a feature module, which in turn divide into different categories, which you can
find here: https://angular.io/guide/module-types
*/
@NgModule({
  // this is where we declare the components, pipes and directives that we want to use within this module
  declarations: [
    AppComponent,
    HttpAndRoutingComponent,
  ],
  /* here we import other modules and this means we can use whatever those moduels have exported in their exports array */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  /* This is where we declare all of the dependencies we want to inject into our components. If you use Angular CLI to
  generate a service, then you have {providedIn: 'root'} passed into the decorator by default which makes sure that the service
  you include will become a Singleton (read more here: https://angular.io/guide/singleton-services), but just keep in mind
  that if you provide the service manually within the providers array in a module or component decorator, then another instance
  of that service is created every time this component or module is imported. */
  providers: [],
  // this is the our root UI component that we load when bootstraping our application
  bootstrap: [AppComponent]
})
export class AppModule { }
