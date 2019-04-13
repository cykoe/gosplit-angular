import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    public location: Location,
    private element: ElementRef,
    private auth: AuthService,
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];

    setTimeout(() => {
      toggleButton.classList.add('toggled');
      //  tslint:disable:no-magic-numbers
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());

    return titlee === '/home';
  }

  isDocumentation() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return titlee === '/documentation';
  }

  isLoggedin() {
    return this.auth.isAuthenticated;
  }

  logout() {
    this.auth.logout();
  }
}
