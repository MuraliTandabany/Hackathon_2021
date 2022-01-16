import { CartService } from './services/cart.service';
import { FilterService } from './services/filter.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SearchComponent } from './layouts/layout/search/search.component';
import { FilterComponent } from './layouts/layout/search/filter/filter.component';
import { MapsListComponent } from './layouts/layout/search/maps-list/maps-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ArViewComponent } from './layouts/layout/search/ar-view/ar-view.component';
import {MatInputModule} from '@angular/material/input';
import { CheckoutComponent } from './layouts/layout/checkout/checkout.component';
import { CartComponent } from './layouts/layout/checkout/cart/cart.component';

import { SignInComponent } from './layouts/layout/checkout/sign-in/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SearchComponent,
    FilterComponent,
    MapsListComponent,
    SignInComponent,
    ArViewComponent,
    CheckoutComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    FilterService, CartService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  entryComponents: [
    ArViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
