import { Component,OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Eğer buton da kullanıyorsanız
import { CommonModule } from '@angular/common';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogData:Array<any> =[];
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((res)=>{
      console.log(res);
      this.blogData=res;
    })
  }
}
