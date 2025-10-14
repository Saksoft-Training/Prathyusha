//#region Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../services/github.Service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  public users: any[] = [];

  private subscription1!: Subscription;
  private subscription2!: Subscription;
  private subscription3!: Subscription;
  private userSubscription!: Subscription;
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {
    this.subscription1 = this.githubService.myFirstSubject.subscribe({
      next: (data) => console.log('subscription1:', data)
    });

    this.subscription2 = this.githubService.myFirstSubject.subscribe({
      next: (data) => console.log('subscription2:', data)
    });

    this.subscription3 = this.githubService.myFirstSubject.subscribe({
      next: (data) => console.log('subscription3:', data)
    });

    this.userSubscription = this.githubService.userbehaviourSubject.subscribe({
      next: (data) => console.log('userBehaviour:', data)
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  public ngOnInit(): void {
    this.githubService.fetchData('anshu').subscribe({
      next: (res: any) => {
        this.users = res.items;
        this.githubService.userbehaviourSubject.next(res.items);
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
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  //#endregion

}
//#endregion

