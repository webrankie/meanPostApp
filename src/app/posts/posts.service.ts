import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Post} from "./post.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {
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

  getPost(id: string | null) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string
    }>(`http://localhost:3000/api/posts/${id}`)
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title); //title will be a part of file name for backend
    console.log(postData);
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', postData)
      .subscribe((resPostData) => {
        const post: Post = {id: resPostData.postId, title: title, content: content};
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
  }

  updatePost(id: string | null | undefined, title: string, content: string) {
    const post: Post = {id: 'null', title: title, content: content};
    this.http.put(`http://localhost:3000/api/posts/${id}`, post).subscribe(
      resPostData => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      })
  }
}
