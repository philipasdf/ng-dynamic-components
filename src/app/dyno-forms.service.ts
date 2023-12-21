import { Injectable, Type, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FragebogenApiService } from './api/fragebogen.api.service';
import { Fragebogen } from './model/fragebogen';
import { UeberschriftComponent } from './form-components/ueberschrift.component';

@Injectable({ providedIn: 'root' })
export class DynoFormsService {
  fragebogenApi = inject(FragebogenApiService);

  rootForm: FormGroup = new FormGroup({});


  currFragebogenConfig: Fragebogen;

  constructor() {
    // falsche Stelle, aber egal jetzt
    this.currFragebogenConfig = this.fragebogenApi.fetchFragebogen();
  }


  getFragebogenConfig(): Fragebogen {
    return this.currFragebogenConfig;
  }

  addComponent() {
    this.currFragebogenConfig.fragen.push({
      order: this.currFragebogenConfig.fragen.length + 1,
      componentConfig: {
        component: UeberschriftComponent,
        formConfig: {
          
        }
      }
    })
  }
}

export type ComponentConfig = { id: string; component: Type<any>; inputs?: Record<string, unknown> };
