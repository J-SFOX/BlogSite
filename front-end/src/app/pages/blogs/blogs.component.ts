import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
   blogs: Blog[] = []

   constructor(
      private blogService: BlogService
   ){}

   ngOnInit(): void {
     this.getBlogs();
   }

   getBlogs(){
      this.blogService.getAllBlogs().subscribe(res => {
        const result = (JSON.parse(JSON.stringify(res)))
        this.blogs = result.data
      })
   }
   

}
