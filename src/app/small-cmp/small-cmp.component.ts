import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-small-cmp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Small Component</h2>
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
export class SmallCmpComponent {}
