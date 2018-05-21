import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-t-shirts',
  templateUrl: './t-shirts.component.html',
  styleUrls: ['./t-shirts.component.scss']
})
export class TShirtsComponent implements OnInit {

  constructor(private cartService: CartService) {}

  productList = this.cartService.getProductByType('t-shirt');

  ngOnInit() {
  }

}
