import { Injectable, OnInit } from '@angular/core';
import { CartItem } from './cart-item';
import { Product } from './product';

@Injectable()
export class CartService implements OnInit{
  cart: CartItem[] = [];
  productList: Product[] = [
    {
      id: 0,
      type: 'sticker',
      name: 'Angular Patterns Sticker',
      price: 199,
      imagePath:'assets/stickers/angular-1@2x.png'
    },
    {
      id: 1,
      type: 'sticker',
      name: 'Angular Animations Sticker',
      price: 300,
      imagePath: 'assets/stickers/angular-1@2x.png'
    },
    {
      id: 2,
      type: 'sticker',
      name: 'Build a Server Rendered + Code Split App in React with React Universal Component Sticker',
      price: 300,
      imagePath:'assets/stickers/react-1@2x.png'
    },
    {
      id: 3,
      type: 'sticker',
      name: 'Server-rendered ReactJS Application with Next.js Sticker',
      price: 300,
      imagePath: 'assets/stickers/next-1@2x.png'
    },
    {
      id: 4,
      type: 'sticker',
      name: 'RXJS Sticker',
      price: 300,
      imagePath: 'assets/stickers/rxjs-1@2x.png'
    }
  ];
  constructor() {   }

  getProductList(): Product[] {
    return this.productList;
  }
  addToCart(productId): void {
    console.log(productId);
  }
  ngOnInit() {

  }

}
