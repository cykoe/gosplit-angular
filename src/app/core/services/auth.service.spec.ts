import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../modules/receipts/shared/user';
import { AuthService, Availability, Credential } from './auth.service';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let jwtHelperServiceSpy: jasmine.SpyObj<JwtHelperService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const helperSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired']);
    const sbSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: JwtHelperService, useValue: helperSpy},
        {provide: MatSnackBar, useValue: sbSpy},
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
    jwtHelperServiceSpy = TestBed.get(JwtHelperService);
    matSnackBarSpy = TestBed.get(MatSnackBar);
  });

  afterEach(() => {
    //  After every test, assert that there are no more pending requests
    httpTestingController.verify();
  });

  // AuthService methods tests begin

  describe('#login', () => {
    let expectedUser: User;

    beforeEach(() => {
      expectedUser = {username: '', token: '', url: ''};
    });

    it('should return user - correct credential', () => {
      const correctCredential: Credential = {username: '', password: ''};
      authService.login(correctCredential).subscribe(
        (user) => expect(user).toEqual(expectedUser, 'should return expected user'),
        fail,
      );

      //  AuthService should made one request to login from /user/login
      const req = httpTestingController.expectOne(`${authService.url}/${authService.loginUrl}`);
      expect(req.request.method).toEqual('POST');

      //  Respond with mock token
      req.flush(expectedUser);
    });

    it('should return an error - incorrect credential', () => {
      const msg = 'Deliberate 404';
      const incorrectCredential: Credential = {username: '', password: ''};
      authService.login(incorrectCredential).subscribe(
        () => fail('expected to fail'),
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.loginUrl}`);
      expect(req.request.method).toEqual('POST');

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 400, statusText: 'Not Found'});
    });

    it('should return user - correct credential called multiple times', () => {
      const correctCredential: Credential = {username: '', password: ''};
      authService.login(correctCredential).subscribe();
      authService.login(correctCredential).subscribe();
      authService.login(correctCredential).subscribe();
      authService.login(correctCredential).subscribe(
        (user) => expect(user).toEqual(expectedUser, 'should return expected user'),
        fail,
      );

      const requests = httpTestingController.match(`${authService.url}/${authService.loginUrl}`);
      // tslint:disable:no-magic-numbers
      expect(requests.length).toEqual(4, 'calls to login()');

      requests[0].flush({});
      requests[1].flush({});
      requests[2].flush({});
      requests[3].flush(expectedUser);
    });
  });

  describe('#logout', () => {
    it('should clean all local storage', () => {
      jwtHelperServiceSpy.isTokenExpired.and.returnValue(true);
      authService.logout();
      expect(authService.isAuthenticated).toBeFalsy();
    });
  });

  describe('#checkUsername', () => {
    it('should return true - available username', () => {
      const expectedAvailability: Availability = {success: true};
      authService.checkUsername('').subscribe(
        (availability) => expect(availability).toEqual(expectedAvailability),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.checkUsernameUrl}`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedAvailability);
    });

    it('should return false - username already taken', () => {
      const expectedAvailability = {success: false};
      authService.checkUsername('').subscribe(
        (availability) => expect(availability).toEqual(expectedAvailability),
        fail,
      );
      // matSnackBarSpy.open.and.returnValue('');

      const req = httpTestingController.expectOne(`${authService.url}/${authService.checkUsernameUrl}`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedAvailability);
    });

    it('should return an error - network error', () => {
      const msg = 'simulated network error';

      authService.checkUsername('').subscribe(
        () => fail('expect to fail'),
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.checkUsernameUrl}`);

      // Create mock ErrorEvent, raised when something goes wrong at the network level
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('offline', {
        message: msg,
      });

      req.error(errorEvent);
    });
  });

  describe('#register', () => {
    let expectedUser: User;

    beforeEach(() => {
      expectedUser = {username: '', token: '', url: ''};
    });

    it('should return user - correct credential', () => {
      const correctCredential: Credential = {username: '', password: ''};
      authService.register(correctCredential).subscribe(
        (user) => expect(user).toBe(expectedUser),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.registerUrl}`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedUser);
    });

    it('should return an error - incorrect credential', () => {
      const msg = 'Deliberate 404';
      const incorrectCredential: Credential = {username: '', password: ''};
      authService.register(incorrectCredential).subscribe(
        () => fail('should fail'),
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.registerUrl}`);
      expect(req.request.method).toBe('POST');

      req.flush(msg, {status: 400, statusText: 'Not Found'});
    });

    it('should return user - correct credential called multiple times', () => {
      const correctCredential: Credential = {username: '', password: ''};
      authService.register(correctCredential).subscribe();
      authService.register(correctCredential).subscribe();
      authService.register(correctCredential).subscribe();
      authService.register(correctCredential).subscribe(
        (user) => expect(user).toEqual(expectedUser, 'should return expected user'),
        fail,
      );

      const requests = httpTestingController.match(`${authService.url}/${authService.registerUrl}`);
      expect(requests.length).toEqual(4, 'called 4 times');

      requests[0].flush({});
      requests[1].flush({});
      requests[2].flush({});
      requests[3].flush(expectedUser);
    });
  });
});
