import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  template: `
    <div class="p-6 flex flex-col gap-6">
      <h2 class="text-2xl">Shopping Cart</h2>
      @for (cart of cartsList(); track cart.id) {
        <div class="bg-white shadow-md border rounded-xl p-4 flex flex-row gap-4 items-start">
          <div>
            <img
              [src]="cart.image"
              class="w-[50px] h-[50px] object-contain"
            />
          </div>
          <div class="flex flex-col mt-2">
            <span class="text-md font-bold">{{ cart.title }}</span>
            <span class="text-sm"> {{ '$' + cart.price }}</span>
          </div>
        </div>
      }

      <div class="bg-white text-xl shadow-orange-50 p-3 flex justify-between items-center">
        <span>Total Cost:</span>
        <span>{{ '$' + totalPrice() }}</span>
      </div>
    </div>
  `,
  styles: ``
})
export class CartComponent {

  cartService = inject(CartService);
  cartsList = this.cartService.cart;

  totalPrice = computed(() => {
    let total = 0;
    for (const cart of this.cartService.cart()) {
      total += cart.price;
    }
    return total;
  });
}
