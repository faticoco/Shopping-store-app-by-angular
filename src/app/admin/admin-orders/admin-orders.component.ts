import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$:any;
  constructor(private orderservice: OrderService) {
    this.orderservice.getOrders().subscribe((orders: any) => {
      this.orders$ = orders;
      console.log(this.orders$);
    });
  }
}
