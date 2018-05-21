import { Injectable, OnInit } from '@angular/core';
import { CartItem } from './cart-item';
import { Product } from './product';

@Injectable()
export class CartService implements OnInit{
  cart: CartItem[] = [];
  newProductList: Product[] = [];
  productList: Product[] = [
    {
      id: 0,
      type: 'sticker',
      name: 'Angular Patterns Sticker',
      price: 1.99,
      imagePath:'assets/stickers/angular-1@2x.png'
    },
    {
      id: 1,
      type: 'sticker',
      name: 'Angular Animations Sticker',
      price: 3,
      imagePath: 'assets/stickers/angular-1@2x.png'
    },
    {
      id: 2,
      type: 'sticker',
      name: 'Build a Server Rendered + Code Split App in React with React Universal Component Sticker',
      price: 3,
      imagePath:'assets/stickers/react-1@2x.png'
    },
    {
      id: 3,
      type: 'sticker',
      name: 'Server-rendered ReactJS Application with Next.js Sticker',
      price: 3,
      imagePath: 'assets/stickers/next-1@2x.png'
    },
    {
      id: 4,
      type: 'sticker',
      name: 'RXJS Sticker',
      price: 3,
      imagePath: 'assets/stickers/rxjs-1@2x.png'
    },
    {
      id: 5,
      type: 't-shirt',
      name: 'RXJS t-shirt',
      price: 20,
      imagePath: 'assets/placeholder.png'
    }
  ];
  constructor() {   }

  getProductList(): Product[] {
    return this.productList;
  }

  getProductByType(type): Product[] {
    this.newProductList = [];
    this.productList.forEach(product => {
      if (product.type == type) {
        this.newProductList.push(product);
      }
    });
    console.log('new product list', this.newProductList);
    return this.newProductList;
  }

  addToCart(productId): void {
    let item = this.productList.find((product) => {
      return product.id == productId;
    });

    let cartItem: CartItem = {
      product: item,
      quantity: 1
    };

    for (let thingInCart of this.cart) {
      if (thingInCart.product.id == item.id) {
        thingInCart.quantity++;
        console.log('CART:', this.cart);
        return;
      }
    };

    this.cart.push(cartItem);
    console.log('CART:', this.cart);
  }
  ngOnInit() {

  }

}
