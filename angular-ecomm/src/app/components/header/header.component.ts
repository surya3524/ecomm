import { Component, inject, signal, computed } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 px-3 py-3 shadow-md rounded-lg mt-0 flex justify-between items-center items">
      <span class="text-xl font-bold">My Store</span>
      <app-primary-button label="{{cartLabel()}}"></app-primary-button> 
    </div>
  `,
  styles: `
  `
})
export class HeaderComponent {
  cartService = inject(CartService);

  cartLabel = computed(() => `Cart (${this.cartService.cart().length})`);
}
