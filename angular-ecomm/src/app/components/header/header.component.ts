import { Component, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 px-3 py-3 shadow-md rounded-lg flex justify-between items-center">
      <span>My Store</span>
      <app-primary-button [label]="Cart()" (btnClicked)="buttonClicked()"></app-primary-button>
    </div>
  `,
  styles: `
  `
})
export class HeaderComponent {

  Cart = signal('Add to Cart');
  
  buttonClicked() {
    alert('Button was clicked!');
  };

}
