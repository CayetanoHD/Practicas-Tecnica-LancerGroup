import 'reflect-metadata';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

const validatorMetadataKey = Symbol('validators');
const oprtionsMetadataKey = Symbol('options');

const errorMessages = {
  required: 'Este campo es requerido',
  max: 'El campo excede el valor permitido',
  min: '',
};

export interface ValidatorsOptions {
  toString: boolean;
}

export function ValidatorsArray(validators: Validators[]) {
  return Reflect.metadata(validatorMetadataKey, validators);
}

export function ValidatorOptions(options: ValidatorsOptions) {
  return Reflect.metadata(oprtionsMetadataKey, options);
}

export function getValidatorsArray(target: any, propertyKey: string) {
  return Reflect.getMetadata(validatorMetadataKey, target, propertyKey);
}

export function getValidatorsOptions(
  target: any,
  propertyKey: string
): ValidatorsOptions {
  return Reflect.getMetadata(oprtionsMetadataKey, target, propertyKey);
}




export function getErrorMessage(error: any) {
  if (!error) {
    return '';
  }

  const keys = Object.keys(error);

  return (errorMessages as any)[keys[0]];
}

@Injectable()
export class FormsHelper {
  constructor(private fb: FormBuilder) { }

  public createForm(model: any, instance?: any): FormGroup {
    const formGroup = new FormGroup({});
    this.generateNestedForms(model, formGroup, instance);
    return formGroup;
  }

  private generateNestedForms(model: any, form: FormGroup, instance: any) {
    const modelIteration = instance ? instance : model;
    Object.keys(modelIteration).forEach((key) => {
      if (model[key] instanceof Date) {
        if (form.get(key)) {
          form.removeControl(key);
        }
        form.addControl(key, new FormControl(model[key]));
      } else if (Array.isArray(model[key])) {
        if (form.get(key)) {
          form.removeControl(key);
        }
        form.addControl(key, new FormControl([]));
      } else if (model[key] && typeof model[key] === 'object') {
        if (form.get(key)) {
          form.removeControl(key);
        }

        form.addControl(
          key,
          this.createNestedForm(
            model[key],
            instance ? instance[key] : undefined
          )
        );
        this.generateNestedForms(
          model[key],
          form.get(key) as FormGroup,
          instance ? instance[key] : undefined
        );
      } else if (
        instance &&
        instance[key] &&
        typeof instance[key] === 'object'
      ) {
        if (form.get(key)) {
          form.removeControl(key);
        }
        form.addControl(
          key,
          this.createNestedForm(instance[key], instance[key])
        );
        this.generateNestedForms(
          instance[key],
          form.get(key) as FormGroup,
          instance ? instance[key] : undefined
        );
      } else {
        let validators = getValidatorsArray(model, key);
        if (!validators && instance) {
          validators = getValidatorsArray(instance, key);
        }

        let options = getValidatorsOptions(model, key);
        if (!options && instance) {
          options = getValidatorsOptions(instance, key);
        }

        let value = model[key];
        if (!value && instance) {
          value = instance[key];
        }

        if (options && options.toString && typeof value === 'number') {
          value = value.toString();
        }

        form.addControl(
          key,
          new FormControl(value, {
            validators,
          })
        );
      }
    });

   
  }


  private createNestedForm(model: any, instance: any): FormGroup {
    const modelIteration = instance ? instance : model;

    let controlsConfig = {};
    Object.keys(modelIteration).forEach((key) => {
      let validators = getValidatorsArray(model, key);
      if (!validators && instance)
        validators = getValidatorsArray(instance, key);

      let options = getValidatorsOptions(model, key);
      if (!options && instance) options = getValidatorsOptions(instance, key);

      let value = model[key];
      if (!value && instance) value = instance[key];

      if (options && options.toString && typeof value === 'number') {
        value = value.toString();
      }

      if (Array.isArray(value)) {
        value = [];
      }

      (controlsConfig as any)[key] = [value, validators];
    });
    return this.fb.group(controlsConfig);
  }

  private createNestedFormArray(
    array: Array<any>,
    arrayName: string
  ): FormArray {
    let formArray: any = [];
    array.forEach((model) => {
      let controlsConfig = {};
      Object.keys(model).forEach((key) => {
        let validators = getValidatorsArray(model, key);
        (controlsConfig as any)[key] = [model[key], validators];
      });
    });
    return this.fb.array(formArray);
  }

  public getFormsGroups(formbase: FormGroup, formsNames: Array<string>) {
    let arrayForms: Array<FormGroup> = new Array<FormGroup>();
    formsNames.forEach((element) => {
      let form = formbase.get(element) as FormGroup;
      if (form != null && form != undefined) {
        arrayForms.push(form);
      }
    });
    return arrayForms;
  }

  public addValidationRequered(
    form: FormGroup,
    controls: Array<string>
  ): FormGroup {
    controls.forEach((control) => {
      (form.get as any)(control).setValidators([Validators.required]);
      // form.get(control).markAllAsTouched();
      (form.get as any)(control).value === 0
        ? (form.get as any)(control).setValue(null)
        : (form.get as any)(control).setValue(form.get(control)?.value);
      (form.get as any)(control).updateValueAndValidity();
    });
    form.updateValueAndValidity();
    return form;
  }
  public removeValidationRequered(
    form: FormGroup,
    constrols: Array<string>
  ): FormGroup {
    constrols.forEach((element) => {
      (form.get as any)(element).setValidators(null);
      (form.get as any)(element).markAllAsTouched();
      (form.get as any)(element).updateValueAndValidity();
    });
    form.updateValueAndValidity();
    return form;
  }

  public getClasses(control: FormControl | AbstractControl ) {
    if (control.touched && control.errors) {
      return 'is-invalid';
    }
    else if (control.touched && !control.errors) {
      return 'is-valid';
    }
    else {
      return '';
    }
  }

  public getClassesBs(control: FormControl | AbstractControl) {
    return {
      'border-danger': control.touched && control.status === 'INVALID',
      'border-success': control.touched && control.status === 'VALID',
    };
  }

  public removeControl(form: FormGroup, arrayControls: Array<string>) {
    if (
      arrayControls !== null &&
      arrayControls !== undefined &&
      arrayControls.length > 0
    ) {
      arrayControls.forEach((c) => {
        form.removeControl(c);
      });
    }
  }

  public removeLine(text: string) {
    const removeLine = /-/gi;
    return text.replace(removeLine, '');
  }
}
