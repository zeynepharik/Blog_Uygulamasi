import { Component,OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Eğer buton da kullanıyorsanız
import { CommonModule } from '@angular/common';
import { BlogService } from '../services/blog.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,NgbPaginationModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageSize =8;
  page=13;

  blogData:Array<any> =[];
  constructor(private blogService:BlogService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((res)=>{
      console.log(res);
      this.blogData=res;
      
    })
  }
  openDialog(element:any,vieworupdate:any) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: {blog:element,isUpdate:vieworupdate}
    });
}
}