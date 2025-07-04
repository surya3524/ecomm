import { Component, inject, signal, computed } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-slate-100 px-3 py-3 shadow-md rounded-lg mt-0 flex justify-between items-center items">
      <span class="text-xl font-bold" routerLink="/">My Store</span>
      <app-primary-button label="{{cartLabel()}}" routerLink="/cart"></app-primary-button>
    </div>
  `,
  styles: `
  `
})
export class HeaderComponent {
  cartService = inject(CartService);

  cartLabel = computed(() => `Cart (${this.cartService.cart().length})`);
}
