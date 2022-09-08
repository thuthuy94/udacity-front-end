import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  public userInformation = {
    name: '',
    total: 0
  };

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.route.queryParams.subscribe((params: any) => {
      this.userInformation.name = params.name;
      this.userInformation.total = params.total;
    });
  }

  ngOnInit(): void {
    this.cartService.clearProductInCar();
  }
}
