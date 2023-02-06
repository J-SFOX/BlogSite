import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from 'src/app/Models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private BlogAPI = 'http://localhost:3000/blogs/';
  constructor(private http: HttpClient) {}

  // retrieve
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.BlogAPI);
  }

  // create
  createBlog(blog: any) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.http.post(this.BlogAPI + '/create', blog, {
      headers: _headers,
    });
  }
  // update
  updateBlog(updatedBlog:Blog) {
    const idBlog = updatedBlog._id
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.http.patch(this.BlogAPI+ `/update/${idBlog}`, updatedBlog, {
      headers: _headers,
    })
  }
  // delete
  deleteBlog(blogId: string, userId: string) {
    return this.http.delete(this.BlogAPI + `/delete/${blogId}&${userId}`);
  }

  getCurrentUserBlog(userId: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.BlogAPI + `/user/${userId}`);
  }
}
