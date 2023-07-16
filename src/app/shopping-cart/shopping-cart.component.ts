import { Product } from './../models/product';
import { CartItem } from './../models/cart-items';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  
  cartItems: CartItem[] = [];
  cartCount: number;
  totalBill:number;

  async ngOnInit() {
    await this.gettingCartItems();
  }

  constructor(public cartservice: ShoppingCartService) {
    this.cartCount = 0;
    this.totalBill = 0;
  }

  async gettingCartItems() {
    let cartid = await this.cartservice.getOrCreateCartid();
    const items: any = await this.cartservice.getItems(cartid).pipe(first()).toPromise();
    
    if (items) {
      console.log(items);
      for (let productKey in items) {
        const cartItem: CartItem = {
          product: items[productKey].product,
          quantity: items[productKey].quantity,
          key: productKey,
          priceTotal: (items[productKey].product.price *items[productKey].quantity)
        };
        this.totalBill +=cartItem.priceTotal;
        this.cartCount+=cartItem.quantity;
        this.cartItems.push(cartItem);
      }
      console.log(this.cartCount);
    }
  }


  AddToCart(p:Product)
  {
      this.cartservice.AddToCart(p);
      
     // window.location.reload();
  }


  RemovefromCart(p :Product)
  {
    this.cartservice.RemoveFromCart(p);
   // window.location.reload();
   
  }

  clearCart()
  {
    const confirmation = confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      this.cartservice.ClearCart();
    }
   
  }
}
