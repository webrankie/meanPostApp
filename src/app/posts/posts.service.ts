import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Post} from "./post.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{
      message: string,
      posts: any
    }>('http://localhost:3000/api/posts') //need to update post type to be more specific
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
          }
        })
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: 't', title: title, content: content};
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((resPostData) => {
        console.log(resPostData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      })
  }

  deletePost(postId: string) {
    this.http.delete(`http://localhost:3000/api/posts/` + postId)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
