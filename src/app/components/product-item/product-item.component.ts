import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  public selectedAmount = '1';

  @Input('item') product: any;
  @Output('value-changed') valueChanged: EventEmitter<any> = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  public addToCart() {
    try {
      const result = {
        ...this.product,
        ...{ amount: parseInt(this.selectedAmount) }
      };
      this.cartService.updateProductInCart(result);
      this.valueChanged.emit(result);
    } catch (error) {
      console.log('error');
    }
  }
}
