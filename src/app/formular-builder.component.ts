import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { ComponentConfig, DynCmpService } from './dyn-cmp.service';
import { UeberschriftComponent } from './form-components/ueberschrift.component';

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
        <button (click)="onShowPreview()">Preview</button>
      </div>

      @if(!!configPreview) { @for (cmp of configPreview; track cmp.id) {
      <ng-container *ngComponentOutlet="cmp.component; inputs: cmp.inputs" />
      } }
    </div>
  `,
})
export class FormularBuilderComponent {
  cmpConfigService = inject(DynCmpService);

  configDragList = this.cmpConfigService.getComponents();
  configPreview: ComponentConfig[] | null = null;

  addCmp() {
    this.cmpConfigService.addComponent({
      id: 'dajdfl',
      component: UeberschriftComponent,
      inputs: {
        modus: 'wysiwyg',
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

  onShowPreview() {
    console.log('Print Component Config in Console');
    console.log(this.configDragList);
    this.configPreview = cloneDeep(this.configDragList);
    this.configPreview = this.configPreview.map((c) => {
      c.inputs!['modus'] = 'formular';

      return c;
    });
  }
}
