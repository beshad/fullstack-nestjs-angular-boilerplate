import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';

import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth'
import { NbAccessChecker } from '@nebular/security'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faHome = faHome;
  faUserPlus = faUserPlus
  faSignInAlt = faSignInAlt
  faSignOutAlt = faSignOutAlt
  faTools = faTools
  faUsers = faUsers

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

}
