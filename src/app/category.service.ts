import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.categoriesRef = this.db.list('/categories', (ref) =>
      ref.orderByChild('name')
    );
  }

  getCategories(): Observable<any[]> {
    return this.categoriesRef.valueChanges();
  }
}
