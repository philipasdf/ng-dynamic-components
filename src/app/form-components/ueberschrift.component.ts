import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class UeberschriftComponent implements OnInit {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';

  @Input({ required: true }) order!: number;

  @Input({ required: false }) config?: any; // wird noch Typ Ueberschriftconfig

  ueberschrift!: FormControl<string>;

  formService = inject(DynoFormsService);

  ngOnInit() {
    console.log('UeberschriftComponent config', this.config);

    this.ueberschrift = new FormControl(
      {
        value: this.config.ueberschrift,
        disabled: false,
      },
      { nonNullable: true }
    );

    const ueberschriftFormGroup: FormGroup = new FormGroup({
      ueberschrift: this.ueberschrift,
    });

    this.formService.rootForm.addControl('ueberschrift' + this.order, ueberschriftFormGroup);
  }
}
