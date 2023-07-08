import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase){ }

  create(product :any)
  {
    const productName = product.title; // Assuming the product name is stored in the 'title' field
  return this.db.object(`/products/${productName}`).set(product);
  }

 
  getall():Observable<any>
  {
    return this.db.list('/products/').valueChanges();
  }

 

  getByTitle(title: string): Observable<any> {
  return this.db.list('/products', (ref) =>
    ref.orderByChild('title').equalTo(title)
  ).valueChanges().pipe(
    map((products) => {
      if (products && products.length > 0) {
        return products[0];
      }
      return null;
    })
  );
}

update(product: any, productid: any) {

  this.db.object(`/products/${productid}`).remove();

  const productName = product.title; // Assuming the product name is stored in the 'title' field
  return this.db.object(`/products/${productName}`).set(product);

}


  deleteByTitle(title: string) {
    return this.db.object(`/products/${title}`).remove();
   
  }
  
  
}
