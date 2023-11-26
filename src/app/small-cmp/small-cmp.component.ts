import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-cmp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <input placeholder="input doesn't work yet" />
    </div>
  `,
  styles: `
    div {
      background-color: lightgray;
      padding: 1rem;
    }
  `,
})
export class SmallCmpComponent {
  @Input({ required: true }) title!: string;
}
