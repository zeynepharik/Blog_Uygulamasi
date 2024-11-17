import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent implements OnInit{

  isUpdate:boolean = false;
  imageUrl:string ="";
  title:string ="";
  body:string="";
  commentData: any[] = [];

  constructor(private commentService:CommentService ,@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef:MatDialogRef<BlogDialogComponent>) {
    debugger;
    if(data.isUpdate){
      this.isUpdate = true;
    }
    else
    {
      // debugger;
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }

}
  ngOnInit(): void {
    this.commentService.getComments().subscribe((res)=>{
      debugger;
      this.commentData=res.filter((x:{postId:any;}) =>x.postId==this.data.blog.id);
      debugger;
    })
  }
  close(){
    this.dialogRef.close();
  }
}
