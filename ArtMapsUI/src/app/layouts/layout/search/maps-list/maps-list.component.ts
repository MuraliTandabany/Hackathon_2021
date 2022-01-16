import { ArViewComponent } from './../ar-view/ar-view.component';
import { CartService } from './../../../../services/cart.service';
import { FilterService } from './../../../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {RouterService} from '../../../../services/router.service';

@Component({
  selector: 'app-maps-list',
  templateUrl: './maps-list.component.html',
  styleUrls: ['./maps-list.component.scss']
})
export class MapsListComponent implements OnInit {

  constructor(public fs: FilterService, public cs: CartService, public dialogRef: MatDialogRef<any, any>,
              public dialog: MatDialog, public routerService: RouterService) { }

  ngOnInit(): void {
    console.log('Hi');
    this.fs.searchForMaps();
  }

  trackByIndex = (index: number, obj: object): number => {
    return index;
  };

  onClickAddToCart(mapObj) {
    this.cs.addToCart(mapObj, this.cs.CART_ADD);
  }

  onClickAdd(mapObj) {
    this.cs.addToCart(mapObj, this.cs.CART_ADD);
  }

  onClickRemove(mapObj) {
    this.cs.addToCart(mapObj, this.cs.CART_REMOVE);
  }

  onClickCart() {
    this.routerService.routeTo('cart');
  }

  onClickOpenAr(mapObj) {
    const dialogRef = this.dialog.open(ArViewComponent, {
      height: '80%',
      width: '75%',
      data: mapObj
    });

    // dialogRef.afterOpened().subscribe(result => {
    //   let iframeElement: HTMLIFrameElement = document.getElementById("arview-iframe");
    //   iframeElement.querySelector()
    // });
    dialogRef.afterClosed().subscribe(result => {
      console.log('AR dialog closed');
    });
  }

}
