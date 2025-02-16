import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

@Injectable({providedIn: 'root'})
export class RequestCacheService implements RequestCache {
  cache = new Map<string, RequestCacheEntry>();
  maxAge = 30000; // maximum cache age (ms)

  constructor() {
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = {url, response, lastRead: Date.now()};
    this.cache.set(url, entry);

    const expired = Date.now() - this.maxAge;
    this.cache.forEach((e) => {
      if (e.lastRead < expired) {
        this.cache.delete(e.url);
      }
    });
  }
}
