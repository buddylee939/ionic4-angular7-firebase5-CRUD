import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_classes/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  image: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Voyager_spacecraft_model.png/260px-Voyager_spacecraft_model.png';
  post: Post;
  postId = null;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
  }

  async getPost() {
    const loading = await this.loadingController.create({
      message: 'Loading Post..'
    });
    await loading.present();
    
    this.postService.getPost(this.postId)
      .subscribe(data => {
        loading.dismiss();
        this.post = data;
      });
  }

  async goToEdit() {
    this.router.navigate(['/post/edit/' + this.postId]);
  }

  async removePost() {
    const loading = await this.loadingController.create({
      message: 'Loading Post..'
    });
    await loading.present();   

    this.postService.removePost(this.postId).then(() => {
      loading.dismiss();
      this.router.navigate(['/posts']);
    })
  }

}
