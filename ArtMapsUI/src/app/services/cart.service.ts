import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice = 0;
  shippingPrice = 10;
  taxPrice = 0;
  finalPrice = 0;

  taxPercent = 5;

  constructor() {
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    this.calculateCartValues();
  }

  cart: Map<any, any> = new Map();
  public ID_PREFIX = 'ID_';
  public CART_ADD = 1;
  public CART_REMOVE = -1;

  addToCart(obj, action) {
    switch (action) {
      case this.CART_ADD:
        obj.cartSize += 1;
        this.cart[this.ID_PREFIX + obj.id] = obj;
        break;
      case this.CART_REMOVE:
        obj.cartSize -= 1;
        if (obj.cartSize === 0) {
          delete this.cart[this.ID_PREFIX + obj.id];
        }
        break;
    }
    this.calculateCartValues();
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  calculateCartValues() {
    this.totalPrice = 0;
    this.taxPrice = 0;
    this.finalPrice = 0;
    if (JSON.stringify(this.cart) !== '{}') {
      for (const cartKey in this.cart) {
        const cartItem = this.cart[cartKey];
        this.totalPrice += cartItem.price * cartItem.cartSize;
      }
      this.taxPrice = (this.totalPrice * this.taxPercent) / 100;
      this.finalPrice = this.totalPrice + this.shippingPrice + this.taxPrice;
    }
  }

  getCartSizeForMap(mapObjId) {
    if (this.cart[this.ID_PREFIX + mapObjId] !== undefined && this.cart[this.ID_PREFIX + mapObjId] !== null) {
      return this.cart[this.ID_PREFIX + mapObjId].cartSize;
    } else {
      return 0;
    }
  }
}
