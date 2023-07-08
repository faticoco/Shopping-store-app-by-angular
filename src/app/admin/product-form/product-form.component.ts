import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  form: FormGroup;
  title: any;

  categories$: Observable<any[]>;
  product:any={};

  constructor(private cat: CategoryService , private prod : ProductService , private fb: FormBuilder , private route : ActivatedRoute ,   private router : Router) {
    this.title = this.route.snapshot.paramMap.get('title');
    console.log(this.title);
    if (this.title) {
      this.prod.getByTitle(this.title).pipe(first()).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    }

    this.categories$ = cat.getCategories();
    this.form = this.fb.group({
      imageUrl: ['', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],
    
    });

   
  }

  save(product:any)
  {
  
         if(this.title){
          this.prod.update(product , this.title);
        }
        else
        {
          this.prod.create(product);
        }
    this.router.navigate(['/admin/products'])
   
  }

  delete()
  {
   
    if(confirm('Are you sure you want to delete this product?'))
    {
      this.prod.deleteByTitle(this.title);
    }
    this.router.navigate(['/admin/products'])
  }

}
