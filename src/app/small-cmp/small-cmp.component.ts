import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-cmp',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <input placeholder="input doesn't work yet" />
    </div>
  `,
  styles: `
    div {
      border: 1px solid orange;
      background-color: lightgray;
      padding: 1rem;
      margin: 1rem;
    }
  `,
})
export class SmallCmpComponent {
  @Input({ required: true }) title!: string;
}
