import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynoFormsService } from '../dyno-forms.service';

@Component({
  selector: 'app-ueberschrift',
  standalone: true,
  imports: [CommonModule, DragDropModule, ReactiveFormsModule],
  template: `
    @if(modus === 'wysiwyg') {
    <div class="component-marker">
      <label>Überschrift</label>
      <input [formControl]="ueberschrift" placeholder="Überschrift eingeben" />
    </div>
    } @else {
    <h3>{{ ueberschrift.value }}</h3>
    }
  `,
})
export class UeberschriftComponent {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';

  ueberschrift: FormControl<string>;

  formService = inject(DynoFormsService);

  constructor() {

    // TODO value reinbekommen
    this.ueberschrift = new FormControl({
      value: '',
      disabled: false
    }, {nonNullable: true});

    
    const ueberschriftFormGroup: FormGroup = new FormGroup({
      ueberschrift: this.ueberschrift
    })


    // TODO order reinbekommen
    this.formService.rootForm.addControl('ueberschrift123', ueberschriftFormGroup);
  }
}
