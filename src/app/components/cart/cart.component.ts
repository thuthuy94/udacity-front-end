import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public productsCart: Product[] = [];
  public total: number;
  public userInformation = {
    name: '',
    address: '',
    creditNumber: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.productCartSubjectObservable.subscribe(res => {
      this.total = 0;
      this.productsCart = res;
      this.productsCart.forEach(
        item => (this.total += item.amount * item.price)
      );
    });
  }

  public changeAmount(product: Product) {
    try {
      this.total = 0;
      this.productsCart.forEach(item => {
        if (item.id === product.id) {
          item.amount = product.amount;
        }
        this.total += item.amount * item.price;
      });
      this.productsCart = this.productsCart.filter(item => item.amount !== 0);
    } catch (error) {
      console.log('error', error);
    }
  }

  public submit(name: any, address: any, creditNumber: any) {
    try {
      if (name.invalid || address.invalid || creditNumber.invalid) {
        name.control.markAsTouched();
        address.control.markAsTouched();
        creditNumber.control.markAsTouched();
        return;
      }
      this.router.navigate(['/confirmation'], {
        queryParams: {
          ...{ name: this.userInformation.name },
          ...{ total: this.total }
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
