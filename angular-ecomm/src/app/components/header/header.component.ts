import { Component, inject, signal, computed } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-slate-100 px-3 py-3 shadow-md rounded-lg mt-0 flex justify-between items-center">
      <span class="text-xl font-bold" routerLink="/">My Store</span>
      
      <div class="flex items-center gap-4">
        <app-primary-button label="{{cartLabel()}}" routerLink="/cart"></app-primary-button>
        
        <!-- User Info or Login Button -->
        @if (authService.user()) {
          <div class="flex items-center gap-2">
            @if (authService.user()?.photoURL) {
              <img 
                [src]="authService.user()?.photoURL" 
                [alt]="authService.user()?.displayName"
                class="w-8 h-8 rounded-full"
              />
            }
            <span class="text-sm font-medium">{{ authService.user()?.displayName }}</span>
            <button 
              (click)="signOut()"
              class="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded">
              Logout
            </button>
          </div>
        } @else {
          <app-primary-button label="Login" routerLink="/login"></app-primary-button>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);

  cartLabel = computed(() => `Cart (${this.cartService.cart().length})`);

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }
}