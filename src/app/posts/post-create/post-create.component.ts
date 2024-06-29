import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  errorMessageTitle = 'Please enter a valid post title';
  errorMessageContent = 'Please enter a valid post content';


  constructor(public _postService: PostsService) {
  }



  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
