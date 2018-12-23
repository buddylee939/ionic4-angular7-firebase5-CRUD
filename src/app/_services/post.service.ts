import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../_classes/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;
  constructor(
    private afs: AngularFirestore
  ) { 
   this.postsCollection = afs.collection<Post>('posts');

   this.posts = this.postsCollection.snapshotChanges().pipe(
     map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
     })
   );
  }

  getPosts() {
    return this.posts;
  }

  getPost(id: string){
    return this.postsCollection.doc<Post>(id).valueChanges();
  }

  updatePost(post: Post, id: string) {
    return this.postsCollection.doc(id).update(post);
  }

  addPost(post: Post){
    return this.postsCollection.add(post);
  }

  removePost(id: string) {
    return this.postsCollection.doc(id).delete();
  }
}
