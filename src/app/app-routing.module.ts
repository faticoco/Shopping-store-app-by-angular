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
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path:'products' , component:ProductsComponent},
  { path:'cart' , component:ShoppingCartComponent},
 

  { path: 'checkout', component: CheckoutComponent , canActivate:[AuthGuardService] },
  { path:'order-success' , component:OrderSuccessComponent , canActivate:[AuthGuardService] },
  {path:'myOrders' , component: MyOrdersComponent , canActivate:[AuthGuardService] },

  { path: 'admin/orders', component: AdminOrdersComponent , canActivate:[AuthGuardService , AdminAuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent , canActivate:[AuthGuardService ,AdminAuthGuardService] },
  { path: 'admin/products/new', component: ProductFormComponent , canActivate:[AuthGuardService ,AdminAuthGuardService] },
  { path: 'admin/products/:title', component: ProductFormComponent , canActivate:[AuthGuardService ,AdminAuthGuardService] },
  { path:'manage-products', component: ManageProductsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
