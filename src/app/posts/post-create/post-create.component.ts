import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ParamMap, ActivatedRoute} from "@angular/router";

import {PostsService} from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  errorMessageTitle = 'Please enter a valid post title';
  errorMessageContent = 'Please enter a valid post content';
  post: any;
  isLoading = false;
  private mode = 'create';
  private postId: string | null | undefined;


  constructor(public _postService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.post = this._postService.getPost(this.postId).subscribe((postDate) => {
          this.isLoading = false;
          this.post = {id: postDate._id, title: postDate.title, content: postDate.content};
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })

  }


  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this._postService.addPost(form.value.title, form.value.content);
    } else {
      this._postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
