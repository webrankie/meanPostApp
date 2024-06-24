import { Component } from '@angular/core';
import {Post} from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  storedPosts: Post[] = [];

  onPostAdded(post: { title: string, content: string }) {
    this.storedPosts.push(post);
  }
}
