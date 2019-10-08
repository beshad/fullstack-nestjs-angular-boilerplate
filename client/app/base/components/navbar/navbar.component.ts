import { Component, OnInit } from '@angular/core';
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

  constructor(
    private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue
  }

  logout() {
    this.authService.logout();
  }

}
