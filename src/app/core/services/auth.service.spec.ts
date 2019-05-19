import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AuthService,
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    //  After every test, assert that there are no more pending requests
    httpTestingController.verify();
  });

  // AuthService methods tests begin

  describe('#login', () => {
    const expectedToken = {token: 'token'};

    it('should return token - correct credential', () => {
      authService.login({}).subscribe(
        (token) => expect(token).toEqual(expectedToken, 'should return a object with token'),
        fail,
      );

      //  AuthService should made one request to login from /user/login
      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}/login`);
      expect(req.request.method).toEqual('POST');

      //  Respond with mock token
      req.flush(expectedToken);
    });

    it('should return an error - incorrect credential', () => {
      authService.login({}).subscribe(
        (message) => expect(message).toContain('wrong credentials'),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}/login`);
      expect(req.request.method).toEqual('POST');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 400, statusText: 'wrong credentials'});
    });
  });

  describe('#logout', () => {
    it('should clean all local storage', () => {
      authService.logout();
      expect(authService.isAuthenticated).toBeFalsy();
    });
  });

  describe('#checkUsername', () => {
    it('should return true - available username', () => {
      const expectedRes = {success: true};
      authService.checkUsername('').subscribe(
          (availability) => expect(availability).toEqual(expectedRes),
          fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedRes);
    });

    it('should return false - username taken', () => {
      const expectedRes = {success: false};
      authService.checkUsername('').subscribe(
        (availability) => expect(availability).toEqual(expectedRes),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedRes);
    });
  });

  describe('#register', () => {
    const expectedToken = {token: 'token'};

    it('should return token - correct credential', () => {
      authService.register({}).subscribe(
        (token) => expect(token).toBe(expectedToken),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}/register`);
      expect(req.request.method).toBe('POST');

      req.flush(expectedToken);
    });

    it('should return an error - incorrect credential', () => {
      const msg = 'username already taken';

      authService.register({}).subscribe(
        (message) => expect(message).toContain(msg),
        fail,
      );

      const req = httpTestingController.expectOne(`${authService.url}/${authService.endpoint}/register`);
      expect(req.request.method).toBe('POST');

      req.flush(msg, {status: 400, statusText: msg});
    });
  });
});
