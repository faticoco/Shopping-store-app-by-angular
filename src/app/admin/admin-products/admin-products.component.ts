import { Component, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  products: {title:string}[] = [];
  filteredproducts: any[] = [];
  subscription: Subscription;
  constructor(private prodservice: ProductService) {
    this.subscription=this.prodservice.getall().subscribe(products =>this.filteredproducts= this.products = products);
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  
  

  filter(query :any)
  {
   this.filteredproducts =(query) ?
   this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
   this.products; 
  }
}
