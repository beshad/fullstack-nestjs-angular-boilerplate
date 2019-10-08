import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service'

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

  currentUser: any
  isLoggedIn: boolean

  constructor(
    private readonly authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = this.authService.isLoggedIn
      this.currentUser = this.authService.currentUserValue
    }
  }

  logout() {
    this.authService.logout();
  }

}
