import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomepageComponent } from './homepage/homepage.component';

import { LogoutComponent } from './logout/logout.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin-orders', component: AdminOrdersComponent },
  { path: 'admin-products', component: AdminProductsComponent },
  { path:'manage-products', component: ManageProductsComponent },
  { path:'order-success' , component:OrderSuccessComponent},
  { path:'products' , component:ProductsComponent},
  { path:'cart' , component:ShoppingCartComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
