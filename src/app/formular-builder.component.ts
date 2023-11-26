import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ComponentConfig, DynCmpService } from './dyn-cmp.service';
import { SmallCmpComponent } from './small-cmp/small-cmp.component';

@Component({
  selector: 'app-formular-builder',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe, DragDropModule],
  template: `
    <div>
      <h2>Formular Builder</h2>

      <div cdkDropList #formList="cdkDropList" [cdkDropListData]="configDragList" (cdkDropListDropped)="drop($event)">
        @for (cmp of configDragList; track cmp.id) {
        <div class="border-blue" cdkDrag>
          <button cdkDragHandle>Drag&Drop Handle</button>
          <ng-container *ngComponentOutlet="cmp.component; inputs: cmp.inputs" />
        </div>
        }
      </div>

      <div>
        <button (click)="addCmp()">Add</button>
      </div>
    </div>
  `,
})
export class FormularBuilderComponent {
  cmpConfigService = inject(DynCmpService);

  configDragList = this.cmpConfigService.getComponents();

  addCmp() {
    this.cmpConfigService.addComponent({
      id: 'dajdfl',
      component: SmallCmpComponent,
      inputs: {
        title: 'asdölfjkasd',
      },
    });
  }

  drop(event: CdkDragDrop<ComponentConfig[]>) {
    console.log('component drag queen', event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
