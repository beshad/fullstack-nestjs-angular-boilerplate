import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faTools } from '@fortawesome/free-solid-svg-icons';

import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth'
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
    public accessChecker: NbAccessChecker,
    private nbTokenService:NbTokenService
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.currentUser = token.getPayload();
        }

      });
  }

  ngOnInit() { }

  logout() {
    this.nbTokenService.clear();
    this.router.navigate(['auth/login']);
  }

}
