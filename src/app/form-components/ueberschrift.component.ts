import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-cmp',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    @if(modus === 'wysiwyg') {
    <div class="component-marker">
      <label>Überschrift</label>
      <br />
      <input placeholder="Überschrift eingeben" />
    </div>
    } @else {
    <h3>lalala</h3>
    }
  `,
})
export class UeberschriftComponent {
  @Input({ required: true }) modus!: 'wysiwyg' | 'formular';
}
