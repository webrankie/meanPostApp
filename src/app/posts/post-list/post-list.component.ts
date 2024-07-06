import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from "../posts.service";
import {Subscription} from 'rxjs';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 6, 10];
  private postsSub: Subscription = new Subscription;

  constructor(public _postService: PostsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this._postService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this._postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this._postService.getPosts(this.postPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this._postService.deletePost(postId);

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
