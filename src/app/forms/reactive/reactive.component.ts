import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  public readonly NOT_UNIQUE_NAME_ERROR = 'name is not unique';
  namesForm: FormGroup;
  names: Set<string> = new Set();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.namesForm = this.fb.group({
      /* here we simply define the property that we can reference our control by
      and we use some built in validators that come from Validators class. */
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    },
    /* this is how to add a custom validator function that uses multiple
    form controls. We use bind(this) to still have a reference to our component
    within the isUnique method, otherwise it would be the namesForm */
    {validator: this.isUnique.bind(this)}
   );
  }

  // this is also just a helper function for use in template. You could also just inline this in the template.
  hasError(controlName: string, error: string): boolean {
    return this.namesForm.get(controlName).hasError(error);
  }

  addName(): void {
    const {firstName, lastName} = this.namesForm.value;
    if (this.nameExists(firstName, lastName)) {
      this.namesForm.setErrors({[this.NOT_UNIQUE_NAME_ERROR]: this.NOT_UNIQUE_NAME_ERROR});
    } else {
      this.names.add(firstName.trim() + lastName.trim());
    }
  }

  nameExists(firstName: string, lastName: string): boolean {
    return this.names.has(firstName.trim() + lastName.trim());
  }

  isUnique(group: FormGroup): ValidationErrors | null {
    const {firstName, lastName} = group.controls;

    if (!this.nameExists || !this.nameExists(firstName.value, lastName.value)) {
      return null;
    } else {
      return {[this.NOT_UNIQUE_NAME_ERROR]: this.NOT_UNIQUE_NAME_ERROR};
    }
  }
}
