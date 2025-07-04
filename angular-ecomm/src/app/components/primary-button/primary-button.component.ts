import { Component, input, Input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `

    <button class="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-50" (click)="btnClicked.emit()">
    <span class="text-md">{{ label() }}</span>
    </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {

  label = input('');
  
  btnClicked = output<void>();

}
