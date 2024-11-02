import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Posts';
import { BehaviorSubject } from 'rxjs';
import posts from '../data/posts';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsSubject = new BehaviorSubject<any>(posts);
  posts$ = this.postsSubject.asObservable();


  constructor() { }

  getPosts(){
    return this.posts$;
  }
  

  addPost(post:any){
    // return this.client.post(`${this.url}posts/`, post);
    // this.postsSubject.next(post);
    this.postsSubject.next(post);
    return this.posts$;
  }
  

  voteScore(posts:any){
    // return this.client.put(`${this.url}/posts/`, post);

    this.postsSubject.next(posts);
  }

}
