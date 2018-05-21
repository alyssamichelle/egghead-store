import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.sass']
})
export class StickersComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  productList = this.cartService.getProductByType('sticker');
  
  addToCart($event, id){
    $event.preventDefault();
    this.cartService.addToCart(id);
  }

  ngOnInit() {
  }

}
