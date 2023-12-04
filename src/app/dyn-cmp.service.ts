import { Injectable, Type } from '@angular/core';
import { UeberschriftComponent } from './form-components/ueberschrift.component';

@Injectable({ providedIn: 'root' })
export class DynCmpService {
  configs: ComponentConfig[] = [
    {
      id: '1',
      component: UeberschriftComponent,
      inputs: { modus: 'wysiwyg' },
    },
  ];

  getComponents(): ComponentConfig[] {
    return this.configs;
  }

  addComponent(cmp: ComponentConfig) {
    this.configs.push(cmp);
  }
}

export type ComponentConfig = { id: string; component: Type<any>; inputs?: Record<string, unknown> };
