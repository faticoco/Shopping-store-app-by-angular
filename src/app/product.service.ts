import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase){ }

  create(product :any)
  {
    return this.db.list('/products').push(product);
  }

 
  getall():Observable<any>
  {
    return this.db.list('/products/').valueChanges();
  }


  getByTitle(title: string): Observable<any> {
    return this.db
      .list('/products', (ref) => ref.orderByChild('title').equalTo(title))
      .valueChanges()
      .pipe(
        map((products) => {
          // Assuming the query will return a single product
          if (products && products.length > 0) {
            return products[0];
          }
          return null;
        })
      );
  }
  
}
