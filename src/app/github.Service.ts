import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
    private baseUrl = 'https://api.github.com/search/users?q=user+in:name,description,login+sort:stars-desc ';
    myFirstSubject= new Subject<any>();
    mySecondSubject= new Subject<any>();
    myThridSubject= new Subject<any>();
    userbehaviourSubject= new BehaviorSubject([]);
    constructor(private http: HttpClient) {}
  /**
   * Fetch GitHub users based on query string.
   * Emits events to various subjects for demonstration.
   * @param query - Search string for GitHub users (default: 'user')
   * @returns Observable of the HTTP GET request
   */
  public fetchData(query: string = 'user'): Observable<any> {
    const params = new HttpParams().set('q', query);
    this.myFirstSubject.next(query);
    this.mySecondSubject.next("hello from second subject");
    this.myThridSubject.next("hello from thrid subject");

    return this.http.get(this.baseUrl, { params });

  }

  // fetchData(): Observable<any> {
  //   return this.http.get(this.baseUrl);
  // }

}
