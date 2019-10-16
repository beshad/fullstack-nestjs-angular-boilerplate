import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faTools } from '@fortawesome/free-solid-svg-icons';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth'
import { NbAccessChecker } from '@nebular/security'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faHome = faHome;
  faUserPlus = faUserPlus
  faSignInAlt = faSignInAlt
  faSignOutAlt = faSignOutAlt
  faTools = faTools

  currentUser: any = {}

  constructor(
    private authService: NbAuthService,
    private router: Router,
    public accessChecker: NbAccessChecker
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // here we receive a payload from the token and assigns it to our `currentUuser` variable 
          this.currentUser = token.getPayload();
          console.log(this.currentUser)
        }

      });
  }

  ngOnInit() { }

  logout() {
    // this.authService.logout();
  }

}
