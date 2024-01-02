import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynoFormsService } from '../dyno-forms.service';

@Component({
  selector: 'app-textfeld',
  standalone: true,
  imports: [CommonModule, DragDropModule, ReactiveFormsModule],
  template: `
    @if(modus === 'wysiwyg') {
    <div class="component-marker">
      <label>Langantwort</label>
      <input [formControl]="frage" placeholder="Frage eingeben" />
      <div>
        <label>Pflichtfeld</label>
        <input [formControl]="pflichtfeld" type="checkbox" />
      </div>
    </div>
    } @else {
    <p>{{ config!.frage }}{{ config!.pflichtfeld ? '*' : '' }}</p>
    <textarea [formControl]="antwortTextarea"></textarea>
    }
  `,
})
export class TextfeldComponent implements OnInit {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';

  @Input({ required: false }) order!: number;

  @Input({ required: false }) config?: any; // wird noch Typ TextfeldConfig

  // wysiwyg
  frage!: FormControl<string>;
  pflichtfeld!: FormControl<boolean>;

  // formular
  antwortTextarea!: FormControl<string>;

  formService = inject(DynoFormsService);

  ngOnInit(): void {
    console.log('TextfeldComponent config', this.config);

    if (this.modus === 'formular') {
      if (this.config!.pflichtfeld) {
        this.antwortTextarea.addValidators([Validators.required]);
      }
    } else {
      this.frage = new FormControl(
        {
          value: this.config.frage,
          disabled: false,
        },
        { nonNullable: true }
      );
      this.pflichtfeld = new FormControl(
        {
          value: this.config.pflichtfeld,
          disabled: false,
        },
        { nonNullable: true }
      );

      const textfeldFormGroup: FormGroup = new FormGroup({
        frage: this.frage,
        pflichtfeld: this.pflichtfeld,
      });

      this.formService.rootForm.addControl('textfeld' + this.order, textfeldFormGroup);
    }
  }
}
