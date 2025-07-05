import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { RemoveButtonComponent } from "../../remove-button/remove-button.component";

@Component({
  selector: 'app-cart',
  imports: [RemoveButtonComponent],
  template: `
    <div class="p-6 flex flex-col gap-6">
      <h2 class="text-2xl">Shopping Cart</h2>
      @for (cart of cartsList(); track cart.id) {
        <div class="bg-white shadow-md border rounded-xl p-4 flex flex-row gap-4 items-start">
          <div class="flex flex-row flex-1 gap-4 items-start">
            <div>
              <img
                [src]="cart.image"
                class="w-[50px] h-[50px] object-contain"
              />
            </div>
            <div class="flex flex-col mt-2">
              <span class="text-md font-bold">{{ cart.title }}</span>
              <span class="text-sm">{{ '$' + cart.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="mt-2 ml-auto">
            <app-remove-button label="Remove" (btnClicked)="handleButtonClick(cart)"></app-remove-button>
          </div>
        </div>
      }

      <div class="bg-white shadow-lg border rounded-xl p-6 flex flex-col gap-4 mt-4">
        <div class="flex justify-between items-center">
          <span class="text-xl">Total Cost:</span>
          <span class="text-xl font-semibold">{{ '$' + totalPrice().toFixed(2) }}</span>
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-80 w-full mt-2">
          <span class="text-md">Proceed to Checkout</span>
        </button>
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

  handleButtonClick(cart: Product) {
    this.cartService.removeFromCart(cart);
  }

}
