import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DynCmpService } from './dyn-cmp.service';

@Component({
  selector: 'app-formular-builder',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `
    <div>
      <h2>Formular Builder</h2>
      <ng-container *ngComponentOutlet="currentCmp.component; inputs: currentCmp.inputs" />
      <button (click)="displayNextCmp()">Next</button>
    </div>
  `,
})
export class FormularBuilderComponent {
  private cmpList = inject(DynCmpService).getComponents();

  private currentCmpIndex = 0;

  get currentCmp() {
    return this.cmpList[this.currentCmpIndex];
  }

  displayNextCmp() {
    this.currentCmpIndex++;
    // Reset the current ad index back to `0` when we reach the end of an array.
    if (this.currentCmpIndex === this.cmpList.length) {
      this.currentCmpIndex = 0;
    }
  }
}
