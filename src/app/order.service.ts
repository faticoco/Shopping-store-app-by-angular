import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { query } from 'firebase/firestore';
import { Order } from './models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) { }

  storeOrder(order:any)
  {
    return this.db.list('/orders').push(order);
  }

  getOrders()
  {
    return this.db.list('/orders/').valueChanges();
  }

  getOrdersByUserId(userId: string): AngularFireList<Order> {
    
    return this.db.list<Order>('/orders', ref =>
      ref.orderByChild('userId').equalTo(userId)
    );
  }
}
