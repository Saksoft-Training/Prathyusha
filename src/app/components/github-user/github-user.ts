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
export class GithubUser implements OnInit, OnDestroy {

  //#region Properties
  public users: GithubUser[] = [];

  private searchQuerySub: Subscription;
  private messageSub: Subscription;
  private notificationSub: Subscription;
  private userListBehaviourSub: Subscription;
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {

    // Subscribe to subjects from GithubService
    this.searchQuerySub = this.githubService.searchQuerySubject.subscribe({
      next: (data) => console.log('searchQuerySubject:', data)
    });

    this.messageSub = this.githubService.messageSubject.subscribe({
      next: (data) => console.log('messageSubject:', data)
    });

    this.notificationSub = this.githubService.notificationSubject.subscribe({
      next: (data) => console.log('notificationSubject:', data)
    });

    this.userListBehaviourSub = this.githubService.userListBehaviour.subscribe({
      next: (data) => console.log('userListBehaviour:', data)
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  public ngOnInit(): void {
    this.githubService.fetchData('anshu').subscribe({
      next: (res: GithubResponse) => { 
        this.users = res.items;
        this.githubService.userListBehaviour.next(res.items);
      },
      error: (error) => {
        console.error('Error fetching data', error);
      },
      complete: () => {
        console.log('Completed fetching data from GitHub API');
      }
    });
  }

  public ngOnDestroy(): void {
    this.searchQuerySub.unsubscribe();
    this.messageSub.unsubscribe();
    this.notificationSub.unsubscribe();
    this.userListBehaviourSub.unsubscribe();
  }
  //#endregion

}
//#endregion
