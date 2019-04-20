import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { BlogService } from '../service/blog.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  selectedFile: any;
  uploadData: any;
  model: any = {};
  userEmail: String;
  userName: String;
  posts: any = [];

  constructor(private http: HttpClient, private userService:UserService, private blogService: BlogService) { }

  ngOnInit() {
    const userObject = this.userService.getLoggedInUser();
    this.userName = userObject.firstName + ' ' + userObject.lastName;
    
    if(userObject)
      this.userEmail = userObject.email;

    this.getAllPosts();
  }

  getAllPosts(){
    this.blogService.getBlogPosts()
      .subscribe(data => {
        
        console.log(data);
        this.posts = data;
        this.posts.forEach(post => {
          post.img = this.getImgData(post.img);
          post.createdDate = this.getDate(post._id);
          post.liked = post.liked_by.some((item) => {
            return (item === this.userName);
          })
          post.comment = '';
        });
        
        this.posts.sort((a: any, b: any) => {
          return new Date(parseInt(b._id.substring(0, 8), 16) * 1000).getTime() - new Date(parseInt(a._id.substring(0, 8), 16) * 1000).getTime();
  
      });

        var $preloader = $('.wrapper');
        var $spinner   = $preloader.find('.loader');
        $spinner.delay(3000).fadeOut('slow');
        $preloader.delay(3000).fadeOut('slow');
        
      }, error => {
        
    });
  }

  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(this.selectedFile);
      
      reader.onload = () => {
        this.uploadData = {
          postDesc: this.model.postDesc,
          email: this.userEmail,
          userName: this.userName,
          fileName: this.selectedFile.name,
          fileType: this.selectedFile.type,
          file: reader.result
        };

        this.uploadData.file = this.uploadData.file.split(',')[1];
        
      };
    }
  }

  onUpload() {
    
    this.blogService.uploadPost(this.uploadData)
      .subscribe(data => {
        console.log(data);
        this.posts = [];
        this.model.postDesc = '';
        this.selectedFile = '';
        this.getAllPosts();
      }, error => {
        
    });
  }

  getImgData(img){
    var binary = '';
    var bytes = new Uint8Array( img.data.data );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:' + img.contentType + ';base64,' + window.btoa( binary );
  }

  getDate(id){
    const date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
    const month = date.toLocaleString('en-us', { month: 'long' });
    return month + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  setlikes(post, flag){
    if(flag){
      post.likes++;
      post.liked = true;
      post.liked_by = this.userName;
      post.unliked_by = '';
    }
    else{
      post.likes--;
      post.liked = false;
      post.liked_by = '';
      post.unliked_by = this.userName;
    }

    //update to db
    const updatedLikesData = {
      likes: post.likes,
      objectId: post._id,
      liked_by: '',
      unliked_by: ''
    }
    if(post.liked_by)
      updatedLikesData.liked_by = post.liked_by;

    if(post.unliked_by)
      updatedLikesData.unliked_by = post.unliked_by;

    this.blogService.updateLikes(updatedLikesData)
      .subscribe(data => {
        console.log(data);
      }, error => {
        
    });
  }

  deletePost(post_id){
    this.blogService.deletePost(post_id)
      .subscribe(data => {
        this.posts = [];
        this.getAllPosts();
      }, error => {
        
    });
  }

  onEnterKey(event, post){
    if(event.keyCode == 13 || event.which == 13) {
      const commentData = {
        comment: post.comment,
        id: post._id,
        userName: this.userName
      }
      this.blogService.addComment(commentData)
      .subscribe(data => {
        console.log(data);
        post.comment = '';
        post.comments = data[0].comments;
      }, error => {
        
    });
    }
  }

}
