import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DynCmpService } from './dyn-cmp.service';
import { SmallCmpComponent } from './small-cmp/small-cmp.component';

@Component({
  selector: 'app-formular-builder',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `
    <div>
      <h2>Formular Builder</h2>

      @for (cmp of cmpConfigService.getComponents(); track cmp.id) {
      <ng-container *ngComponentOutlet="cmp.component; inputs: cmp.inputs" />
      }

      <div>
        <button (click)="addCmp()">Add</button>
      </div>
    </div>
  `,
})
export class FormularBuilderComponent {
  cmpConfigService = inject(DynCmpService);

  addCmp() {
    this.cmpConfigService.addComponent({
      id: 'dajdfl',
      component: SmallCmpComponent,
      inputs: {
        title: 'asdölfjkasd',
      },
    });
  }
}
