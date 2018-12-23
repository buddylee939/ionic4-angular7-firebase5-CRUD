import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../_mock-data/mockBook';
import { POSTS } from '../_mock-data/mockPost';
import { PostService } from '../_services/post.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Post } from '../_classes/post';
@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  posts = POSTS;
  constructor(
    private postService: PostService,
    private router: Router
  ) { 
    this.posts.forEach(post => {
      this.createPosts(post)
    });
    this.router.navigate(['/posts']);
  }

  ngOnInit() {
  }

  createPosts(post: Post) {
    this.postService.addPost(post);
  }

}
