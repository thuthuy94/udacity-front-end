import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productCartSubject = new BehaviorSubject<Product[]>([]);
  public productCartSubjectObservable = this.productCartSubject.asObservable();
  public addedProductCart: Product[] = [];

  constructor(private toastr: ToastrService) {}

  public updateProductInCart(value: Product): void {
    this.addedProductCart = this.addedProductCart.filter(
      item => item.id !== value.id
    );
    this.addedProductCart = this.addedProductCart.concat(value);
    this.productCartSubject.next(this.addedProductCart);
    this.toastr.success('Cart updated successfully!', 'Success');
  }

  public clearProductInCar() {
    this.productCartSubject.next([]);
  }
}
