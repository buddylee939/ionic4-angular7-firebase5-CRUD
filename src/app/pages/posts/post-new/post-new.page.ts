import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_classes/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.page.html',
  styleUrls: ['./post-new.page.scss'],
})
export class PostNewPage implements OnInit {
  post: Post = {
    title: '',
    body: '',
    createdAt: new Date().getTime()
  }
  constructor(
    private router: Router,
    private postService: PostService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  async savePost() {
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
    this.postService.addPost(this.post).then(() => {
      loading.dismiss();
      this.router.navigate(['/posts']);
    })
  }

}
