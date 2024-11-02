import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Post[]; // Current filtered posts
  originalPosts!: Post[]; // Store original posts

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.originalPosts = posts;
        this.posts = this.sortPostsByScore(posts); // Sort posts by score when fetching
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  sortPostsByScore(posts: Post[]): Post[] {
    return posts.sort((a, b) => b.score - a.score); // Sort in descending order
  }

  upvote(post: Post) {
    // Update the score only for the current post
    post.score++;
    this.postService.voteScore(this.originalPosts); // Update the scores in the service
    this.posts = this.sortPostsByScore([...this.posts]); // Re-sort the currently displayed posts
  }

  downvote(post: Post) {
    if (post.score > 0) {
      post.score--; // Decrement score
      this.postService.voteScore(this.originalPosts); // Update the scores in the service
      this.posts = this.sortPostsByScore([...this.posts]); // Re-sort the currently displayed posts
    }
  }

  onPostChange(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();

    // If search input is empty, revert to original posts and sort
    if (!searchValue) {
      this.posts = this.sortPostsByScore([...this.originalPosts]); // Reset and sort posts to original
    } else {
      // Filter posts based on title and sort the results
      this.posts = this.sortPostsByScore(
        this.originalPosts.filter((post: Post) =>
          post.title.toLowerCase().includes(searchValue)
        )
      );
    }
  }
}
