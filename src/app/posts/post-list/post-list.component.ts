import {Component} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  // posts = [
  //   {title: "First Post", content: "This is the first post content" },
  //   {title: "second Post", content: "This is the second post content" },
  //   {title: "Third Post", content: "This is the Third post content" },
  // ]

  posts: any[] = [];
}
