  import { Component, OnInit  } from '@angular/core';
  import { GithubService } from '../../services/github.Service';
  import { HttpClientModule } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-github-user',
    imports: [FormsModule, CommonModule, HttpClientModule],
    templateUrl: './github-user.html',
    styleUrls: ['./github-user.scss']
  })
  export class GithubUser implements OnInit{
    public users: any[] = [];
    subscrption1: Subscription;
    subscrption2: Subscription;   
    subscrption3: Subscription;
    userSuscription: Subscription;
      

    constructor(private githubService: GithubService ) {

      this.subscrption1=this.githubService.myFirstSubject.subscribe({
        next:(data)=>{ console.log(data)},
      })
      this.subscrption2=this.githubService.myFirstSubject.subscribe({
        next:(data)=>{ console.log(data)},
      })
      this.subscrption3=this.githubService.myFirstSubject.subscribe({
        next:(data)=>{ console.log(data)},
      })
      this.userSuscription=this.githubService.userbehaviourSubject.subscribe({
        next:(data)=>{ console.log(data)},
      })
    }
    /**
   * Lifecycle hook that runs on component initialization.
   * Fetches GitHub users and updates userBehaviourSubject.
   */
    public ngOnInit(): void  {
    this.githubService.fetchData('anshu').subscribe(
      (res: any) => {
        this.users = res.items;
        this.githubService.userbehaviourSubject.next(res.items);
      }
      ,
      (error) => {
        console.error('Error fetching data', error);
      },  () => {
        console.log('Completed fetching data from GitHub API');
      } 
    );
  }
  /**
   * Lifecycle hook called when component is destroyed.
   * Completes destroy$ to unsubscribe from all observables.
   */
    public ngOnDestroy() :void{
      this.subscrption3.unsubscribe();
      this.githubService.myThridSubject;
    }
  }
