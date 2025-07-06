import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../product-list/product-card/product-card.component';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock?: number;
};

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="flex justify-center w-full">
      <div class="w-4/5 p-3 grid grid-cols-2 gap-4">
        @for (product of products(); track product.id) {
          <app-product-card [product]="product"/>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  products = signal<Product[]>([]);

  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data);
  }
}
