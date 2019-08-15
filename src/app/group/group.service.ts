import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IGroup } from '../constants/models';
import { Group } from '../receipt/shared/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  readonly url: string = `${environment.api_url}/group`;

  constructor(
    private http: HttpClient,
  ) {
  }

  createGroup(group: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.url}/create`, group);
  }

  updateGroup(group: IGroup): Observable<any> {
    return this.http.post<IGroup>(`${this.url}/update`, group);
  }

  deleteGroup(group: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.url}/delete`, group);
  }

  listGroups(): Observable<IGroup[]> {
    return this.http.post<IGroup[]>(`${this.url}/list`, {});
  }
}
