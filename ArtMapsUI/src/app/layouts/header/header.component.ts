import { Component, OnInit } from '@angular/core';
import {RouterService} from '../../services/router.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private routerService: RouterService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onClickLogo() {
    this.routerService.routeTo('');
  }

  onClickHomeIcon() {
    this.routerService.routeTo('');
  }

  onClickCartIcon() {
    this.routerService.routeTo('cart');
  }

  onClickUserIcon() {
    if (!this.loginService.isAuthenticated()) {
      this.routerService.routeTo('sign-in');
    }
  }

}
