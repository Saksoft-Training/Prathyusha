// this service also created for practice session only
//#region Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
//#endregion

//#region Injectable Metadata
@Injectable({
  providedIn: 'root'
})
//#endregion

//#region GithubService
export class GithubService {

  //#region Properties
  private baseUrl = 'https://api.github.com/search/users?q=user+in:name,description,login+sort:stars-desc';

  /** Subjects for demonstration purposes */
  public myFirstSubject = new Subject<any>();
  public mySecondSubject = new Subject<any>();
  public myThridSubject = new Subject<any>();
  public userbehaviourSubject = new BehaviorSubject<any[]>([]);
  //#endregion

  //#region Constructor
  constructor(private http: HttpClient) {}
  //#endregion

  //#region Service Methods

  //#region fetchData
  /**
   * Fetch GitHub users by query string.
   * Emits events to multiple subjects for demonstration purposes.
   * @param query - Search term for GitHub users (default: 'user')
   * @returns Observable of the HTTP GET request
   */
  fetchData(query: string = 'user'): Observable<any> {
    const params = new HttpParams().set('q', query);

    // Emit demo events
    this.myFirstSubject.next(query);
    this.mySecondSubject.next("hello from second subject");
    this.myThridSubject.next("hello from thrid subject");

    return this.http.get(this.baseUrl, { params });
  }
  //#endregion

  //#endregion

}
//#endregion