import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
