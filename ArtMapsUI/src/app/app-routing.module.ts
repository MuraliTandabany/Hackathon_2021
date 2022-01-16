import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './layouts/layout/checkout/cart/cart.component';
import { CheckoutComponent } from './layouts/layout/checkout/checkout.component';
import { SignInComponent } from './layouts/layout/checkout/sign-in/sign-in/sign-in.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SearchComponent } from './layouts/layout/search/search.component';


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent }
  // { path: '', redirectTo: '/searchplaces', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
