import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_classes/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {
  post: Post = {
    title: '',
    body: '',
    createdAt: new Date().getTime()
  }

  postId = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.getPost();
  }

  async getPost() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    
    this.postService.getPost(this.postId)
      .subscribe(data => {
        loading.dismiss();
        this.post = data;
      })
  }

  async updatePost() {
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
    
    this.postService.updatePost(this.post, this.postId).then(() => {
      loading.dismiss();
      this.router.navigate(['/post', this.postId]);
    });
  }
}
