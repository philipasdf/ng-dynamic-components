import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-small-cmp',
  standalone: true,
  imports: [CommonModule, DragDropModule, ReactiveFormsModule],
  template: `
    @if(modus === 'wysiwyg') {
    <div class="component-marker">
      <label>Überschrift</label>
      <input [formControl]="ueberschrift" placeholder="Überschrift eingeben" />
      <div>
        <label>Pflichtfeld</label>
        <input [formControl]="pflichtfeld" type="checkbox" />
      </div>
      <button (click)="testForm()">TEST</button>
    </div>
    } @else {
    <h3>{{ title }}</h3>
    }
  `,
})
export class UeberschriftComponent {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';
  @Input({ required: false }) title?: string;

  ueberschrift: FormControl<string> = this.fb.nonNullable.control({ value: '', disabled: false });
  pflichtfeld: FormControl<boolean> = this.fb.nonNullable.control({ value: true, disabled: false });

  constructor(private fb: FormBuilder) {}

  testForm() {
    console.log(this.ueberschrift.value);
    console.log(this.pflichtfeld.value);
  }
}
