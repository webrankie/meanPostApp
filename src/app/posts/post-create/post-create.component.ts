import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  form!: FormGroup;
  private mode = 'create';
  private postId: string | null | undefined;


  constructor(public _postService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]}),

    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.post = this._postService.getPost(this.postId).subscribe((postDate) => {
          this.isLoading = false;
          this.post = {
            id: postDate._id,
            title: postDate.title,
            content: postDate.content
          };
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content,
            'image': null
          });
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
  }


  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this._postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this._postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}
