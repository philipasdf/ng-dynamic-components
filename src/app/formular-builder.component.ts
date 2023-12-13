import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ComponentConfig } from './dyn-cmp.service';
import { DynoFormsService, FrageRendered, FragebogenConfigRendered } from './dyno-forms.service';

@Component({
  selector: 'app-formular-builder',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe, DragDropModule],
  template: `
    <div>
      <h2>Formular Builder</h2>

      <div
        cdkDropList
        #formList="cdkDropList"
        [cdkDropListData]="fragebogenConfig.fragen"
        (cdkDropListDropped)="drop($event)"
      >
        @for (frage of fragebogenConfig.fragen; track frage.index) {
        <div class="border-blue" cdkDrag>
          <button cdkDragHandle>Drag&Drop Handle</button>
          <ng-container *ngComponentOutlet="frage.componentConfig.component; inputs: { modus: 'wysiwyg' }" />
        </div>
        }
      </div>

      <div>
        <button (click)="addCmp()">Add</button>
        <button (click)="onShowPreview()">Preview</button>
      </div>

      @if(!!configPreview) { @for (cmp of configPreview; track cmp.id) {
      <ng-container *ngComponentOutlet="cmp.component; inputs: { modus: 'formular' }" />
      } }
    </div>
  `,
})
export class FormularBuilderComponent {
  dynoFormsService = inject(DynoFormsService);

  fragebogenConfig: FragebogenConfigRendered = this.dynoFormsService.getFragebogenConfig();
  configPreview: ComponentConfig[] | null = null;

  addCmp() {
    this.dynoFormsService.addComponent();
  }

  drop(event: CdkDragDrop<FrageRendered[]>) {
    console.log('component drag queen', event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onShowPreview() {
    console.log('Print Component Config in Console');
    const buildedForm = this.dynoFormsService.rootForm;
    const ueberschrift1 = this.dynoFormsService.rootForm.controls['ueberschrift123'].value;
    debugger;
  }
}
