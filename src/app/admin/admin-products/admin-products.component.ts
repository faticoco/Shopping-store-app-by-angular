import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products:any;
  constructor(private prodservice : ProductService)
  {
    this.products= this.prodservice.getall();
  }
}
