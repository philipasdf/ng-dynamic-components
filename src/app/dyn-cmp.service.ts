import { Injectable, Type } from '@angular/core';
import { SmallCmpComponent } from './small-cmp/small-cmp.component';

@Injectable({ providedIn: 'root' })
export class DynCmpService {
  getComponents() {
    return [
      {
        component: SmallCmpComponent,
        inputs: { title: 'Dr. IQ', bio: 'Smart as they come' },
      },
      {
        component: SmallCmpComponent,
        inputs: { title: 'Bombasto', bio: 'Brave as they come' },
      },
    ] as { component: Type<any>; inputs: Record<string, unknown> }[];
  }
}
