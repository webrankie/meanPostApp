import {Component, EventEmitter, Output} from '@angular/core';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  @Output() postCreated = new EventEmitter<Post>();

  enteredTitle = '';
  enteredContent = '';

  onAddPost() {
    const post: Post = {title: this.enteredTitle, content: this.enteredContent};
    this.postCreated.emit(post);
  }

}
