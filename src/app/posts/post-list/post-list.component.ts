import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from "../posts.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription = new Subscription;

  constructor(public _postService: PostsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this._postService.getPosts();
    this.postsSub = this._postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this._postService.deletePost(postId);

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
