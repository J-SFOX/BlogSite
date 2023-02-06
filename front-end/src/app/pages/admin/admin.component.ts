import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Blog } from 'src/app/Models/blog';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  userBlogs: Blog[] = [];
  updatedBlog:Blog = {
    _id:'' ,
    title: '',
    content: '',
    creator: '',
  }
  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.getUserBlogs();
  // }
  ngOnInit(): void {
    this.getUserBlogs();
  }

  deleteBlog(blogId: string) {
    let userId = this.authService.getUserId();
    this.blogService.deleteBlog(blogId, userId).subscribe(()=>{
      this.getUserBlogs();
    });

  }

  updateBlog() {
    this.blogService.updateBlog(this.updatedBlog).subscribe((_res)=>{
      const response = JSON.parse(JSON.stringify(_res));
      if(response.success){
        this.flashMessages.show('Blog Updated successfully', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.getUserBlogs()  // i need to find how i can trigger//
                            // an event to change the table data //
      }else{
        this.flashMessages.show('Something Went Wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    })
  }

  refresh(s:string){
    this.getUserBlogs();
  }

  setUpdatedBlog(blog:Blog){
    this.updatedBlog = blog;
  }


  getUserBlogs() {
    const userId = this.authService.getUserId();
    this.blogService.getCurrentUserBlog(userId).subscribe((res) => {
      const result = JSON.parse(JSON.stringify(res));
      this.userBlogs = result.data;
    });
  }
  // getting the blogs from blogService
}
