import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public isLoading = false;
  public products: Product[] = [];
  private readonly _destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsSource();
  }

  private getProductsSource() {
    try {
      this.isLoading = true;
      this.productService
        .getProducts()
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this._destroy$)
        )
        .subscribe(res => {
          this.products = res;
        });
    } catch (error) {
      console.log('error', error);
    }
  }

  public updateData(value: any) {
    console.log(value);
  }
}
