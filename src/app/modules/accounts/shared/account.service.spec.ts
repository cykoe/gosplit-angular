// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
//
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from '../../../shared/modules/material.module';
//
// import { testPeople } from '../../receipts/shared/data';
// import { Person } from '../../receipts/shared/person.model';
// import { AccountService } from './account.service';
//
// describe('AccountService', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let accountService: AccountService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         BrowserAnimationsModule,
//         MaterialModule,
//       ],
//       providers: [
//         AccountService,
//       ],
//     });
//     httpClient = TestBed.get(HttpClient);
//     httpTestingController = TestBed.get(HttpTestingController);
//     accountService = TestBed.get(AccountService);
//   });
//
//   afterEach(() => {
//     httpTestingController.verify();
//   });
//
//   describe('#listPeople', () => {
//     let expectedPeople: any[];
//
//     beforeEach(() => {
//       expectedPeople = testPeople.map((person) => new Person(person).toJson());
//     });
//
//     it('should return all expected people', () => {
//       accountService.list().subscribe(
//         (people) => expect(people.map((p) => p.toJson())).toEqual(expectedPeople, 'should return all people'),
//         fail,
//       );
//
//       const req = httpTestingController.expectOne(accountService.url + accountService.endpoint + 'info');
//       expect(req.request.method).toEqual('GET');
//
//       req.flush(expectedPeople);
//     });
//
//     it('should be OK returning no people', () => {
//       accountService.list().subscribe(
//         (people) => expect(people.length).toEqual(0, 'should return no people'),
//         fail,
//       );
//
//       const req = httpTestingController.expectOne(accountService.url + accountService.endpoint + 'info');
//       expect(req.request.method).toEqual('GET');
//
//       req.flush([]);
//     });
//
//     it('should turn server errors into empty people', () => {
//       accountService.list().subscribe(
//         (people) => expect(people.length).toEqual(0, 'should return no people'),
//         fail,
//       );
//
//       const req = httpTestingController.expectOne(accountService.url + accountService.endpoint + 'info');
//       expect(req.request.method).toEqual('GET');
//
//       req.flush('err msg', {status: 404, statusText: 'not found'});
//     });
//   });
//
//   describe('#updatePeople', () => {
//     let expectedPeople: any[];
//     let newPeople: Person[];
//
//     beforeEach(() => {
//       expectedPeople = testPeople.map((person) => new Person(person).toJson());
//       newPeople = testPeople.map((person) => new Person(person));
//     });
//
//     it('should return all expected people', () => {
//       accountService.update(newPeople).subscribe(
//         (people) => expect(people.map((p) => p.toJson())).toEqual(expectedPeople, 'should create and return all people'),
//         fail,
//       );
//
//       const req = httpTestingController.expectOne(accountService.url + accountService.endpoint + 'info');
//       expect(req.request.method).toEqual('PUT');
//
//       req.flush(expectedPeople);
//     });
//
//     it('should treat server errors as no effect', () => {
//       accountService.update(newPeople).subscribe(
//         (people) => expect(people).toEqual(newPeople, 'should ignore server errors and retain original people'),
//         fail,
//       );
//
//       const req = httpTestingController.expectOne(accountService.url + accountService.endpoint + 'info');
//       expect(req.request.method).toEqual('PUT');
//
//       req.flush('err msg', {status: 404, statusText: 'not found'});
//     });
//   });
//
// });
