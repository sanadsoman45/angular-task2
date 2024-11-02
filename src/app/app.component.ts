import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { map, Observable } from 'rxjs';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'blogapp';

  loading$: Observable<boolean>;

  constructor(private loaderService: LoaderService, private postsService: PostsService) {
    this.loading$ = this.loaderService.loading$;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postsService.getPosts().pipe(map((posts:any)=>{
      this.postsService.addPost(posts);
    }))
  }

}
