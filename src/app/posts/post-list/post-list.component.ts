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
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 6, 10];
  private postsSub: Subscription = new Subscription;

  constructor(public _postService: PostsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this._postService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this._postService.getPostUpdateListener().subscribe((postData: {
      posts: Post[],
      postCount: number
    }) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this._postService.getPosts(this.postPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this._postService.deletePost(postId).subscribe(() => {
      this._postService.getPosts(this.postPerPage, this.currentPage);
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
