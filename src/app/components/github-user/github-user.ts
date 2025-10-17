//#region Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../services/github.Service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
//#endregion

//#region Models
export interface GithubUser {
  id: number;       // Added id for trackBy
  login: string; 
}
export interface GithubResponse {
  items: GithubUser[];
}
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-github-user',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './github-user.html',
  styleUrls: ['./github-user.scss']
})
//#endregion

//#region GithubUser Component
export class GithubUserComponent implements OnInit, OnDestroy {

  //#region Properties
  public users: GithubUser[] = [];
  private subscriptions: Subscription = new Subscription();
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {
    this.subscriptions.add(
      this.githubService.searchQuerySubject.subscribe(data => console.log('searchQuerySubject:', data))
    );
    this.subscriptions.add(
      this.githubService.messageSubject.subscribe(data => console.log('messageSubject:', data))
    );
    this.subscriptions.add(
      this.githubService.notificationSubject.subscribe(data => console.log('notificationSubject:', data))
    );
    this.subscriptions.add(
      this.githubService.userListBehaviour.subscribe(data => console.log('userListBehaviour:', data))
    );
  }
  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.githubService.fetchData('anshu').subscribe({
      next: (res: GithubResponse) => { 
        this.users = res.items;
        this.githubService.userListBehaviour.next(res.items);
      },
      error: (error) => console.error('Error fetching data', error),
      complete: () => console.log('Completed fetching data from GitHub API')
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // automatically unsubscribes all
  }
  //#endregion

  //#region TrackBy Function
  trackById(index: number, user: GithubUser): number {
    return user.id;
  }
  //#endregion

}
//#endregion
