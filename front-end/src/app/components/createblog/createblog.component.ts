import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Blog } from 'src/app/Models/blog';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css']
})
export class CreateblogComponent {
  title = ''
  content = ''
  creator = ''

  @Output() refreshRows = new EventEmitter<string>()

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private flashMessages: FlashMessagesService
  ){}

  

  createBlog(){
    const userId = this.authService.getUserId()
    const blog = {
      title: this.title,
      content: this.content,
      creator : userId
    }
    this.blogService.createBlog(blog).subscribe((_res) => {
        const response = JSON.parse(JSON.stringify(_res));
        if(response.success){
          this.flashMessages.show('Blog Created successfully', {
            cssClass: 'alert-success',
            timeout: 3000,
          });
          this.refreshRows.emit('f')
        }
        else{
          this.flashMessages.show('Something Went Wrong', {
            cssClass: 'alert-danger',
            timeout: 3000,
          });
        }
    })
  }
} 
