import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  form: FormGroup;
  categories$: Observable<any[]>;
  product:any;
  constructor(private cat: CategoryService , private prod : ProductService , private fb: FormBuilder , private route : ActivatedRoute) {
    
    let title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.prod.getByTitle(title).pipe(first()).subscribe((data) => {
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
    this.prod.create(product);
    console.log(product);
  }
}
