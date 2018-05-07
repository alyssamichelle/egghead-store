import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StickersComponent } from './stickers/stickers.component';
import { PopularComponent } from './popular/popular.component';
import { TShirtsComponent } from './t-shirts/t-shirts.component';
import { CartService } from './cart.service';

const appRoutes: Routes = [
  { path: 'stickers', component: StickersComponent },
  { path: 'popular', component: PopularComponent },
  { path: 't-shirts', component: TShirtsComponent },
  { path: '', redirectTo: '/stickers',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    StickersComponent,
    PopularComponent,
    TShirtsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
