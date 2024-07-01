import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ParamMap, ActivatedRoute} from "@angular/router";

import {PostsService} from "../posts.service";
import {Post} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  errorMessageTitle = 'Please enter a valid post title';
  errorMessageContent = 'Please enter a valid post content';
  post: any;
  private mode = 'create';
  private postId: string | null | undefined;


  constructor(public _postService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this._postService.getPost(this.postId)
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
    if (this.mode == 'create') {
      this._postService.addPost(form.value.title, form.value.content);
    } else {
      this._postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
