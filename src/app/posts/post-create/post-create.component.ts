import {Component, EventEmitter, Output} from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  @Output() postCreated = new EventEmitter<Post>();

  errorMessageTitle = 'Please enter a valid post title';
  errorMessageContent = 'Please enter a valid post content';
  enteredContent = '';

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {title: form.value.title, content: form.value.content};
    this.postCreated.emit(post);
  }
}
