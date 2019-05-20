import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RequestCacheEntry, RequestCacheService } from './request-cache.service';

describe('RequestCacheService', () => {
  let requestCacheService: RequestCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestCacheService],
    });

    requestCacheService = TestBed.get(RequestCacheService);
  });

  describe('#get', () => {
    afterAll(() => {
      requestCacheService.cache.clear();
    });

    it('should get cache - stored in map', () => {
      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: {}});
      const expectedCache: RequestCacheEntry = {lastRead: Date.now(), url: '', response: expectedResponse};
      requestCacheService.cache.set('url', expectedCache);
      expect(requestCacheService.get(new HttpRequest('GET', 'url'))).toEqual(expectedResponse);
    });

    it('should not get cache - expired', () => {
      const unreachableRes = new HttpResponse({status: 200, statusText: 'OK', body: {}});
      const unreachableCache: RequestCacheEntry = {
        lastRead: Date.now() - requestCacheService.maxAge * 2,
        url: '',
        response: unreachableRes,
      };
      requestCacheService.cache.set('url', unreachableCache);
      expect(requestCacheService.get(new HttpRequest('GET', 'url'))).toEqual(undefined);
    });

    it('should not get cache - not found in map', () => {
      expect(requestCacheService.get(new HttpRequest('GET', 'url'))).toEqual(undefined);
    });
  });

  describe('#put', () => {
    it('should store cache', () => {
      const newReq = new HttpRequest('GET', 'url');
      const newRes = new HttpResponse({status: 200, statusText: 'OK', body: {}});
      requestCacheService.put(newReq, newRes);
      const expectedRes = {url: newReq.urlWithParams, lastRead: Date.now(), response: newRes};
      expect(requestCacheService.cache.get(newReq.urlWithParams).response).toEqual(expectedRes.response);
      expect(requestCacheService.cache.size).toEqual(1);
    });
  });
});
