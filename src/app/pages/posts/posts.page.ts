import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_classes/post';
import { PostService } from 'src/app/_services/post.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {  
  pageTitle: string = "All Posts"
  post$: Post[];
  constructor(
    private postService: PostService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  async getPosts() {
    const loading = await this.loadingController.create({
      message: 'Loading Posts..'
    });
    await loading.present();
        
    this.postService.getPosts()
      .subscribe(data => {
        // console.log(data);
        loading.dismiss();
        this.post$ = data;
      });
  }

}
