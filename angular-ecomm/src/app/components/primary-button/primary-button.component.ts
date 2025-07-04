import { Component, input, Input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" (click)="btnClicked.emit();">
      {{label()}}
    </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {

  label = input('');
  
  btnClicked = output();

}
