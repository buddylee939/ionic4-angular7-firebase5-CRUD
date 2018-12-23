# How to Create a Simple Ionic 4 App with Firebase and AngularFire
[from here](https://devdactic.com/ionic-4-firebase-angularfire/)

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Todo } from '../_classes/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
 
  private todos: Observable<Todo[]>;
  constructor(
    private afs: AngularFirestore
  ) { 
    this.todosCollection = afs.collection<Todo>('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {      
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTodos() {
    return this.todos;
  }
 
  getTodo(id: string) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
 
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id: string) {
    return this.todosCollection.doc(id).delete();
  }  
}
```
# Created a data loop to populate the database

- go to /data page
- the data.page.ts loads the mock data from mock-data/posts
- then does a foreach loop, sending the posts to the createPost function
- which calls the post service and writes the post to the database
