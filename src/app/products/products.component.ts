import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { first } from 'rxjs';
import { Location } from '@angular/common';

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
   cartCount:number;

   async ngOnInit() {
   this.cart = await this.cartService.getOrCreateCartid();
   this.subscription=this.cart;
   await this.totalItemsCount(); //init total cart items count
  }

  ngOnDestroy(): void {
   this.subscription?.unsubscribe;
  }


   constructor(
    private service :ProductService ,
    private cat: CategoryService , 
    route:ActivatedRoute,
    private cartService :ShoppingCartService,
    private location: Location
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
      this.cartCount=0;
   }
  
 
      AddToCart(p:Product)
      {
          this.cartService.AddToCart(p);
          
         // window.location.reload();
      }


      RemovefromCart(p :Product)
      {
        this.cartService.RemoveFromCart(p);
       // window.location.reload();
       
      }
      
      async  totalItemsCount()
      {
        this.cartCount=0;
        if (!this.cart)
        {
          console.log("No cart");
        }
        let cartid = await this.cartService.getOrCreateCartid();
       
        const items: any = await this.cartService.getItems(cartid).pipe(first()).toPromise();
        
        if (items ) 
        {
              for(let product in items) 
              {
                console.log(items[product].quantity +"is my product quan");
                
                this.cartCount += items[product].quantity;
              }
        }
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

  
