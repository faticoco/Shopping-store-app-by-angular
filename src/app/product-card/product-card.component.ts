import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  products:Product[]=[];
  
  FilteredProducts:Product[]=[];

  
  categories:any;
  category:any;
  constructor(private service :ProductService , private cat: CategoryService , route:ActivatedRoute)
  {  
     this.service.getall().subscribe(products =>{
       //getting all products
       this.products=products

       //getting the selected category products
       route.queryParamMap.subscribe(params => {
         this.category= params.get('category'); 
 
         this.FilteredProducts= (this.category)?
         this.products.filter(p => p.category==this.category ):
         this.products;
       });
 
     });

     this.categories= this.cat.getCategories();
    

    
  }
}
