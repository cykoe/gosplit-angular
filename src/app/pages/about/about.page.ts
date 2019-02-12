import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.sass'],
})
export class AboutPage implements OnInit {
  su: boolean;
  activate = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return !!this.auth.token;
  }

  logout() {
    this.auth.logout();
  }
}
