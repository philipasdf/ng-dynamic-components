import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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

  // ob das FormControl hier drin erstellt wird oder von außen reingegeben wird, ist egal
  ueberschrift: FormControl<string> = this.fb.nonNullable.control({ value: '', disabled: false });

  formService = inject(DynoFormsService);

  constructor(private fb: FormBuilder) {
    // wichtig ist nur, dass das FC in die FG reinkommt, damit man von überall an den Form-Status rankommt
    this.formService.rootForm.addControl('ueberschrift123', this.ueberschrift);

    // TODO: Plan: jede einzelne Komponente erzeugt eine eigene FormGroup
  }
}
