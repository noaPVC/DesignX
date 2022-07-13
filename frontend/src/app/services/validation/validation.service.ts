import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  findInvalidControls(form: FormGroup) {
    const invalid = [];
    const controls = form.controls;

    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }

    return invalid;
  }

  getControlError(form: FormGroup, controlName: string, error: string) {
    return form.controls[controlName].getError(error)
  }
}
