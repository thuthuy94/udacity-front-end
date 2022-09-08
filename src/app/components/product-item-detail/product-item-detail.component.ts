import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  public productId: number;
  public isLoading = false;
  public product: Product | any;
  public selectedAmount = '1';
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productId = parseInt(productId);
      this.getProductById(this.productId);
    }
  }

  private getProductById(id: number) {
    try {
      this.isLoading = true;
      this.productService
        .getProductById(id)
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this._destroy$)
        )
        .subscribe((res: Product) => {
          this.product = res;
        });
    } catch (error) {
      console.log('error', error);
    }
  }

  public addToCart() {
    try {
      const result = {
        ...this.product,
        ...{ amount: parseInt(this.selectedAmount) }
      };
      this.cartService.updateProductInCart(result);
    } catch (error) {
      console.log('error', error);
    }
  }
}
