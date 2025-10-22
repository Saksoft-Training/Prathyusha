import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUser } from './github-user';

describe('GithubUser', () => {
  let component: GithubUser;
  let fixture: ComponentFixture<GithubUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
