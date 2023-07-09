import { Subscription } from 'rxjs';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { CategoryService } from 'src/app/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{

   products:Product[]=[];
   FilteredProducts:Product[]=[];
   categories:any;
   category:any;
   cart:any;
   subscription:Subscription | undefined;
   addtocartclicked:any;

   async ngOnInit() {
   this.cart = await this.cartService.getOrCreateCartid();
   this.subscription=this.cart;
  }

  ngOnDestroy(): void {
   this.subscription?.unsubscribe;
  }


   constructor(
    private service :ProductService ,
    private cat: CategoryService , 
    route:ActivatedRoute,
    private cartService :ShoppingCartService
    )
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
  
 
      AddToCart(p:Product)
      {
        
          this.cartService.AddToCart(p);
          this.addtocartclicked=!this.addtocartclicked;
      
      }

      async getQuantity(p: Product) {
        if (!this.cart) {
          console.log("No cart");
          return 0;
        }
        let cartid = await this.cartService.getOrCreateCartid();
       
        const items: any = await this.cartService.getItems(cartid).pipe(first()).toPromise();
        
        if (items && items[p.title]) {
          const item = items[p.title];
          console.log(item.quantity);
          return item.quantity;
        }
      
        return 0;
      }
      
   }

  
