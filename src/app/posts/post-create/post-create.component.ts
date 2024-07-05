import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ParamMap, ActivatedRoute} from "@angular/router";
import {EMPTY} from "rxjs";
import {PostsService} from "../posts.service";
import {Post} from "../post.model"
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  errorMessageTitle = 'Please enter a valid post title';
  errorMessageContent = 'Please enter a valid post content';
  post: any; // need to be checked to update a type of post to work with Post model ( post: Post )
  isLoading = false;
  form!: FormGroup;
  imagePreview: any;
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
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),

    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.post = this._postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content

          };
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content,
            image: this.post.imagePath
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
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);
  }


  onSavePost() {
    // if (this.form.invalid) {
    //   console.log('Form is invalid:', this.form);
    //   console.log('Form is image:', this.form.value.image);
    //   console.log('Form Image name:' +  this.form.value.image.name);
    //   console.log('Form Image name typeof:' +  typeof(this.form.value.image.name));
    //   return;
    // }
    this.isLoading = true;
    if (this.mode == 'create') {
      this._postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this._postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}
