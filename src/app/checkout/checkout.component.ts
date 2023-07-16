import { CartItem } from './../models/cart-items';
import { first, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit , OnDestroy{

  cart:any;
  cartItems: CartItem[] = [];
  cartsubscription:Subscription | undefined;
  usersubscription:Subscription | undefined;
  userid!: string;

  constructor(private cartService: ShoppingCartService ,
     private orderservice  : OrderService,
     private authservice: AuthServiceService,
     private router: Router)
  {

  }

  async ngOnInit()
  {
    this.cart = await this.cartService.getOrCreateCartid();
    this.cartsubscription=this.cart; 
    this.initializeOrderSummary();
    this.usersubscription=this.authservice.users.subscribe((user:any )=> {
      return this.userid = user.uid;
    })
  }
  

  ngOnDestroy(): void {
    this.cartsubscription?.unsubscribe;
    this.usersubscription?.unsubscribe;
   }

   async initializeOrderSummary()
  {
    let cartid = await this.cartService.getOrCreateCartid();
    const items: any = await this.cartService.getItems(cartid).pipe(first()).toPromise();
    
    if (items) {
      console.log(items);
      for (let productKey in items) {
        const cartItem: CartItem = {
          product: items[productKey].product,
          quantity: items[productKey].quantity,
          key: productKey,
          priceTotal: (items[productKey].product.price *items[productKey].quantity)
        };
        this.cartItems.push(cartItem);
     
      }
 
    }
  }
   

  async placeOrder(f:any)
  {
    let cartid = await this.cartService.getOrCreateCartid();
    const items: any = await this.cartService.getItems(cartid).pipe(first()).toPromise();
    
    if (items) {
      console.log(items);
     
      let order ={
        userId:this.userid,
        orderitems: this.cartItems,
        shipping: f
      }
     let result = await this.orderservice.storeOrder(order);
     this.cartService.ClearCart();
     this.router.navigate(['/order-success' , result.key])
    }
  }
}
