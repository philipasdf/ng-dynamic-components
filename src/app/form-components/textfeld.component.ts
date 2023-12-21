import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

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
      <button (click)="testForm()">TEST</button>
    </div>
    } @else {
    <p>{{ config!.frage }}{{ config!.pflichtfeld ? '*' : '' }}</p>
    <textarea [formControl]="antwortTextarea"></textarea>
    }
  `,
})
export class TextfeldComponent implements OnInit {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';

  @Input({ required: false }) config?: any;

  // wysiwyg
  frage: FormControl<string> = this.fb.nonNullable.control({ value: '', disabled: false });
  pflichtfeld: FormControl<boolean> = this.fb.nonNullable.control({ value: true, disabled: false });

  // formular
  antwortTextarea: FormControl<string> = this.fb.nonNullable.control({ value: '', disabled: false });

  dataService = inject(DataService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.modus === 'formular') {
      if (this.config!.pflichtfeld) {
        this.antwortTextarea.addValidators([Validators.required]);
      }
    }

    // TODO formControl muss an das übergeordnete form angehängt werden
  }

  testForm() {
    console.log(this.frage.value);
    this.dataService.setData(this.frage.value);

    console.log('data from service (textfeldcomponent)', this.dataService.getData());

    console.log(this.pflichtfeld.value);

    /**
     * Die Component soll eine Konfiguration zusammenstellen:
     *
     */
    // const config: TextfeldConfig = {
    //   _tag: 'Textfeld',
    //   frage: this.frage.value,
    //   pflichtfeld: this.pflichtfeld.value,
    // };
  }
}
