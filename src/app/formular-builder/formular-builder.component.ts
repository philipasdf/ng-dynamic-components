import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DynoFormsService, ComponentConfig } from '../dyno-forms.service';
import { Frage, Fragebogen } from '../model/fragebogen';

@Component({
  selector: 'app-formular-builder',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe, DragDropModule],
  templateUrl: 'formular-builder.component.html'
})
export class FormularBuilderComponent {
  dynoFormsService = inject(DynoFormsService);

  fragebogenConfig: Fragebogen = this.dynoFormsService.getFragebogenConfig();
  configPreview: ComponentConfig[] | null = null;

  addCmp() {
    this.dynoFormsService.addComponent();
    console.log(this.fragebogenConfig);
  }

  drop(event: CdkDragDrop<Frage[]>) {
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
