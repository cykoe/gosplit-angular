import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, throttleTime } from 'rxjs/operators';
import { AuthService } from '../../../core/services';
import { ProgressBarService } from '../../../core/services';

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({opacity: 0, transform: 'translateY(-100%)'}),
      ),
      state(
        'visible',
        style({opacity: 1, transform: 'translateY(0)'}),
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  color = 'warn';
  mode: string;
  isVisible = true;

  constructor(
    public location: Location,
    private element: ElementRef,
    private auth: AuthService,
    private progressBarService: ProgressBarService,
  ) {
    this.sidebarVisible = false;
  }

  @HostBinding('@toggle')
  get toggle(): string {
    return this.isVisible ? 'visible' : 'hidden';
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.mode = mode;
    });
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share(),
    );

    scroll$.subscribe((res) => this.isVisible = res === Direction.Up);
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

  isReceipt() {
    const titlee = this.location.prepareExternalUrl(this.location.path());

    return titlee.includes('/receipts/');
  }

  isLoggedin() {
    return this.auth.isAuthenticated;
  }

  logout() {
    this.auth.logout();
  }
}
