import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  imports: [],
  template: `
    <button class="bg-red-400 text-white px-4 py-2 rounded-xl shadow-md
    hover:opacity-50" (click) = "btnClicked.emit()">
      {{label()}} 
    </button>
  `,
  styles: ``
})
export class RemoveButtonComponent {

  label = input('');

  btnClicked = output<void>();
}
