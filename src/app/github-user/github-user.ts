  import { Component, OnInit  } from '@angular/core';
  import { GithubService } from '../github.Service';
  import { HttpClientModule } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-github-user',
    imports: [FormsModule, CommonModule, HttpClientModule],
    templateUrl: './github-user.html',
      styleUrls: ['./github-user.scss']
      // tamplate: `<p>github-user works!</p>`,
  })
  export class GithubUser implements OnInit{
    users: any[] = [];
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
    ngOnInit() {
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
    ngOnDestroy() {
      this.subscrption3.unsubscribe();
      this.githubService.myThridSubject;
    }
  }
