import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {  switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthServiceService } from '../auth-service.service';
import { of } from 'rxjs';
import { Order } from '../models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$:any;

  constructor(private orderservice: OrderService, private authservice: AuthServiceService) {
    
  }
  ngOnInit(): void {
    this.authservice.users.pipe(
      switchMap((u: firebase.User | null) => {
        if (u) {
          console.log(u.uid + ' is already my userid');
          return this.orderservice.getOrdersByUserId(u.uid).valueChanges();
        } else {
          console.log('User is null');
          // Handle the case when the user is null
          return of<Order[]>([]);
        }
      })
    ).subscribe((orders: Order[]) => {
      this.orders$ = orders; // Assign the orders to the component's orders$ variable
      console.log(orders); // Log the orders array
    });
  }
  



}
