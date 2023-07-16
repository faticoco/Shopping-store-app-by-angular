import { first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase ,) { 
  
  }


  private create()
  {
   return this.db.list('/shoppingcart').push({
      datecreated: new Date().getTime()
    })
  }



  async getOrCreateCartid() :Promise<string>
  {
  
    let cartId= localStorage.getItem('cartId');
          if(cartId)
          {
            return cartId;
          }
              let result:any;
              result=await this.create();
              localStorage.setItem('cartId', result.key);
              return result.key;       
  }


  async RemoveFromCart(p: Product) {
    console.log('Deleting');
    const cartId = await this.getOrCreateCartid();
    console.log('Removing ' + cartId);
    const itemsRef = this.db.object(`/shoppingcart/${cartId}/items`);
    itemsRef.valueChanges().pipe(take(1)).subscribe((items: any) => {
      if (items && items[p.title]) {
        if (items[p.title].quantity > 1) {
          console.log('Deleting item');
          itemsRef.update({ [p.title]: { ...items[p.title], quantity: items[p.title].quantity - 1 } });
        } else {
          console.log('Permanently removing item');
          itemsRef.update({ [p.title]: null });
        }
      }
    });
  }
  
  
  async AddToCart(p: Product) {
    console.log('Adding');
    const cartId = await this.getOrCreateCartid();
    const itemsRef = this.db.object(`/shoppingcart/${cartId}/items`);
    itemsRef.valueChanges().pipe(take(1)).subscribe((items: any) => {
      if (items && items[p.title]) {
        console.log('update item');
        itemsRef.update({ [p.title]: { ...items[p.title], quantity: items[p.title].quantity + 1 } });
      } else {
        console.log('create item');
        itemsRef.update({ [p.title]: { product: p, quantity: 1 } });
      }
    });
  }


  async ClearCart() {
    console.log('Clearing Cart');
    const cartId = await this.getOrCreateCartid();
    this.db.object(`/shoppingcart/${cartId}/items`).remove();
  }
  

  getItems(cartId: string) {
    return this.db.object(`/shoppingcart/${cartId}/items/`).valueChanges();
  }
  
}

