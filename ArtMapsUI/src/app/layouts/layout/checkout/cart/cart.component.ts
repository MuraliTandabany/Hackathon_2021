import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cs: CartService) {
  }

  ngOnInit(): void {
  }
  onClickAddItemCountInCart(cartItem) {
    this.cs.addToCart(cartItem.value, this.cs.CART_ADD);
  }

  onClickReduceItemCountInCart(cartItem) {
    this.cs.addToCart(cartItem.value, this.cs.CART_REMOVE);
  }


}
