import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ueberschrift',
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

  dataService = inject(DataService);

  constructor(private fb: FormBuilder) {}

  testForm() {
    console.log(this.ueberschrift.value);

    console.log('data from service (uberschrift component)', this.dataService.getData());

    console.log(this.pflichtfeld.value);

    /**
     * Die Component soll eine Konfiguration zusammenstellen:
     *
     */
    const exampleConfig = {
      componentName: 'Ueberschrift',
      inputs: {
        ueberschrift: 'Eingegebene Überschrift',
      },
    };
  }
}
