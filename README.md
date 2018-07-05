# Egghead Store Course Outline

# Create Project with SCSS/SASS going bc we aren't barbarians

if you've already created the project:
# change extension in component.ts

## ng set defaults.styleExt scss
```ts
  },
  "defaults": {
    "styleExt": "scss",
    "component": {
    }
  }
```

Otherwise, create a new project with this flag:

`ng new project-name --style=scss`


# import the angular router service into the app.module.ts

`// import { RouterModule, Routes } from '@angular/router';`

(ours was already included in our package.json and downloaded since we used the cli to start from scratch)

# define our routes inside array

`const appRoutes: Routes = [];`

# configure our routes (with routerModule.forRoot) and add to app's import array (like registering it with our app?)

```ts
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
```

The data property in the third route is a place to store arbitrary data associated with this specific route. The data property is accessible within each activated route. Use it to store items such as page titles, breadcrumb text, and other read-only, static data.


The empty path in the fourth route represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start.
 
# create a stickers comp

n g c stickers

# route to that comp as default

const appRoutes: Routes = [
  { path: 'stickers', component: StickersComponent },
  { path: '', redirectTo: '/stickers',
    pathMatch: 'full' }
];


First we are going to create the components route itself, then we will set it as the default. Order does matter:

The router uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes.

# Style for the class of .active (that is auto magically applied)

# create and share a global var style sheet
https://github.com/angular/angular-cli/issues/1253

What we do is create a folder called shared and under it a styles folder. We then create our sass there. Finally from your top level component typically "app.component.scss" just import.
@import '../assets/stylesheets/variables'

Forgot you also on the top level component need to set View Encapsulation.

# Setting View Encapsulation to none for our root component

I also went ahead and set view encapsulation to none on our root component. This is going to allow us to import a styles variable file and all the children components of the root app.component will inherit these styles. Yay cascading styles!

**app.component.ts**
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
}
```

# Creating the Variable stylesheet

If you check out the app.component.sass, you will see that I created and imported a variable stylesheet. This is a place for us to store global style variables, like the ones already there:


```scss
$eh-green: #58cd90
$eh-black: #232c3b
$eh-dark-blue: #171e28
$eh-blue: #63758d
$red: #ea4335
```

Let's run the project using ng serve. You should see this at http://localhost:4200/ in your browser...


# Generate the other two comps
Let's go ahead and get our navigation working! First, we need to generate our two components (t-shirts and stickers).

```console
ng g c t-shirts
ng g c stickers
```


# Creating Routes for our navigation

Import the angular router service into the app.module.ts
`import { RouterModule, Routes } from '@angular/router';`

# Create appRoutes const
`const appRoutes: Routes = [];`

# Configure our routes
Next, we need to configure our appRoutes with routerModule.forRoot(). This goes inside our app.module.ts imports array:

```ts
  RouterModule.forRoot(
    appRoutes
  )
```

# Route to that comp as default

Now to create a couple of routes! Our stickers path needs to point to our StickersComponent.

```ts
const appRoutes: Routes = [
  { path: 'stickers', component: StickersComponent },
  { path: '', redirectTo: '/stickers', pathMatch: 'full' }
];
```

The empty path in the second route represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start.

# Create the other route for our t-shirts component
Remember to leave the most generic routes, last. Order does matter! So in this case, we are leaving the empty route until the very end, for our "catch all" route.


# Add Navigation in app.component.html
At the top, we'll add a routerLink attribute with the route for each of the anchors:
```html
<nav>
  <a routerLink="/t-shirts">T-Shirts</a>
  <a routerLink="/stickers">Stickers</a>
</nav>
```

Include the router-outlet at the bottom of our `app.component.html`:
`<router-outlet></router-outlet>`

Our routes are working now!

# Getting the active links to LOOK active
However, we don't have active styles applying to the links when each route in turn is selected. I've already added .activestyles to the app.component.sass file:

```sass
  a, a:focus, a:active
    color: $eh-black
    text-decoration: none
    margin: 14px
    &:first-child
      margin-left: 0

  a.active
    font-weight: bold
    cursor: default
    color: $eh-blue
```

We just need to set a routerLinkActive attribute to the active anchor. This is going to add a class of .active to each anchor when the routerLink route is selected.
```html
<a routerLink="/t-shirts" routerLinkActive="active">T-Shirts</a>
<a routerLink="/stickers" routerLinkActive="active">Stickers</a>
```

Watch the magic happen:

# TODO: Add buttons for each product (maybe, or we could just attach it to the link.... hmmmm)

Lesson 2?

Up until this point, everything has been very static. Let's go ahead and create a couple of classes for our product and cart items along with a cart Service. Then, in our stickers component, we will inject the CartService and dynamically generate our template based on a productList. We want to inject it in the constructor and not just import it so that we can call the `addToCart` method inside the Service and pass it a product id!


# Adding the buttons functionality
We need each of these buttons to add their product to the cart. The rest of our game plan will look something like this:
* Generate Cart service
* Import & Include Cart Service inside app.module.ts provider array
* Create Product Class
* Create CartItem Class


## Adding the buttons functionality

We need each of these buttons to add their product to the cart. The rest of our game plan will look something like this:
- Generate Cart service
- Import & Include Cart Service inside `app.module.ts` provider array
- Create Product Class
- Create CartItem Class

### Generate Cart Service
We are going to need a cart service to give us access to our cart to add/remove items.To generate our cart service, I used the CLI command:

```console
ng g s cart
```

### Import & Include Cart Service inside `app.module.ts` provider array
```ts
import { CartService } from './cart.service';

...

providers: [
  CartService
],
```

## Creating Classes for `product` and `cartItem`
In order to add thing to our cart, we need to create a couple of classes, `cartItem`s that will consist of `product`s.

### Create Product Class:
We would like our products to consist of an id, type, name and price (in cents).

**./product.ts**
```ts
export class Product {
  id: number;
  type: string;
  name: string;
  price: number;
}
```

### Create Cart Item Class:

We want all of our cart items to have not only the product info (from above) but also the quantity and the size if applicable.

**./cartItem.ts**
```ts
import { Product } from './product';

export class CartItem {
  product: Product;
  quantity: number;
  size?: string | null;
}
```


## Populating our Cart Service

Now, inside our cart service, we will import the cartItem and product classes.

**cart.service.ts**

```ts
import { Injectable } from '@angular/core';
import { CartItem } from './cartItem';
import { Product } from './product';


@Injectable()
```

Then we'll create a hard coded productList for now, with all the stickers.

```ts
export class CartService {

  // hard coded data, FOR NOW! MUHAHA
  productList: Product[] = [
    {
      id: 0,
      type: 'sticker',
      name: 'Angular Sticker',
      price: 500
    },
    {
      id: 1,
      type: 'sticker',
      name: 'AngularJS Sticker',
      price: 500
    },
    {
      id: 2,
      type: 'sticker',
      name: 'NativeScript Sticker',
      price: 500
    },
    {
      id: 3,
      type: 'sticker',
      name: 'React Sticker',
      price: 500
    },
    {
      id: 4,
      type: 'sticker',
      name: 'VueJS Sticker',
      price: 500
    }
  ];
```

Next we need to create a cart that is an array of cartItems.

```ts
  cart: CartItem[] = [];
  constructor() {}
```

Now for the fun part! We need three functions, one to return the products in the cart (`getCart()`), one to return all the available products (`getProducts()`) and one to add items into our cart for shopping fun (`addToCart`)! Here we could import and use `Observable` and `of` from RXJS, but for now I chose to keep it simple:

```ts
  // Could use Observables if we wanted
  // getCart(): Observable<CartItem[]> {
  //   return of(this.cart);
  // }
  //
  // getProducts(): Observable<Product[]> {
  //   return of(this.productList);
  // }

  getCart(): CartItem[] {
    return this.cart;
  }

  getProducts(): Product[] {
    return this.productList;
  }

}
```

Our `addToCart()` method needs to be a bit more complex, so let's break it down.

We could do something like this:
```ts
  addToCart(productId): void {
    let item = this.productList.find( (product)=>{
      return product.id == productId;
    });

    let cartItem: CartItem = {
      product: item,
      quantity: 1
    };

    this.cart.push(cartItem);
    console.log('CART:', this.cart);
  }
```
In this implementation, we take the `productId` passed in and set `item` to the product with a matching id. Then we take that item and put it into a `cartItem` with a default quantity of 1. Then simply push the `cartItem` into the cart. This works of course, but isn't super flexible. If the shopper chooses to buy two of the same sticker, this way would push that same sticker into the cart twice instead of simply updating the quantity of the first sticker. What we'd rather have happen is first check if that product exists in the cart, if it does update the quantity, else push the new product into the cart.

```ts
  addToCart(productId): void {
    let item = this.productList.find( (product)=>{
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
```

Now that all this cool cart functionality has been created, we can go into our stickers component and use it! For a quick test, let's connect each of the buttons (again, hard coded, I know) and call an `addToCart()` method that we need to create in the stickers component. We'll pass in a product id for each product.

`<button (click)="addToCart(0)" [primary]="true">Angular Sticker $5</button>`

So each of our buttons will have this nifty call on click `(click)="addToCart(0)"`.


## Finishing the addToCart functionality in the stickers component


Now let's create the `addToCart` functionality inside our `stickers.component.ts` by importing the `CartService`.

**stickers.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.sass']
})
```

Then we'll go ahead and inject our `cartService` in the constructor params. We need to do it here, because there are methods on the CartService which we'd like to use.

```ts
export class StickersComponent implements OnInit {

  constructor(private cartService: CartService) {}

  ngOnInit() {}

}
```

### Now we simply need to create an `addToCart` function

This function will pass the productId to the Service and let it handle all the logic.

```ts
export class StickersComponent implements OnInit {

  constructor(private cartService: CartService) {}

  addToCart(productId): void {
    this.cartService.addToCart(productId);
  }

  ngOnInit() {}

}
```

## The Cart is now being populted!!!!

Now when we click the stickers buttons, each sticker is added to the cart!

And if we selected the same sticker multiple times, we see that it just updates the quantity for that product in the cart!

Now on click, we see in our console log the product id being passed to the cartService and logging out! We are so close to populating our cart!!!


## Animating Cart Count Update

1. import goods to allow animations into app.module.ts

  `BrowserAnimationsModule`

2. import these things into the comp we will be adding the animation to:

`import { trigger, state, style, animate, transition } from '@angular/animations';`

3. Define the animation trigger

# TODO: Flesh out cart view
# TODO: Update app to angular 6 (make course start in lesson 6)


# create t-shirt template/comp
# create t-shirt product
# get products by type
# make styles work for any product page

# update to ng6

# create cart view

# add animation when product gets added to cart

# get add to cart working on t-shirts



# FUTURE COURSE NOTES

## Integrating Stripe Payments in Your Angular Application 

## Enhanced UX With Animation in Angular Applications

## Service Workers 
(may want to start with SW... or that could be a diff course!)
https://angular.io/guide/service-worker-getting-started
The --service-worker flag takes care of configuring your app to use service workers by adding the service-worker package along with setting up the necessary files to support service workers. For information on the details, see the following section which covers the process in detail as it shows you how to add a service worker manually to an existing app.

ng new my-project --service-worker


## Store Part II
- adding views per product
- changing product color
- adding carousel to view multiple pics per product















