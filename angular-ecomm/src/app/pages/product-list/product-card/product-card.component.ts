import { Component, input, inject } from '@angular/core';
import { Product } from '../../products-list/products-list.component';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col mt-2">
        <span class="text-md font-bold">{{ product().title }}</span>
        <span class="text-sm"> {{ '$' + product().price }}</span>
        <app-primary-button class="mt-1" label = "Add to Cart" (btnClicked) = "cartService.addToCart(product())" ></app-primary-button>
      </div>

      <!-- Stock status removed as requested -->
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {

      cartService = inject(CartService);
      product = input.required<Product>();
}
