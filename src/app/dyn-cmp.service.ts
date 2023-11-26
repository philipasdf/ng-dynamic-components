import { Injectable, Type } from '@angular/core';
import { SmallCmpComponent } from './small-cmp/small-cmp.component';

@Injectable({ providedIn: 'root' })
export class DynCmpService {
  configs: ComponentConfig[] = [
    {
      id: '1',
      component: SmallCmpComponent,
      inputs: { title: 'Dr. IQ', bio: 'Smart as they come' },
    },
    {
      id: '2',
      component: SmallCmpComponent,
      inputs: { title: 'Bombasto', bio: 'Brave as they come' },
    },
  ];

  getComponents(): ComponentConfig[] {
    return this.configs;
  }

  addComponent(cmp: ComponentConfig) {
    this.configs.push(cmp);
  }
}

export type ComponentConfig = { id: string; component: Type<any>; inputs: Record<string, unknown> };
