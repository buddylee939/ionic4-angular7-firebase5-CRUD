
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo } from 'src/app/_classes/todo';
 
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
 
  todo: Todo = {
    task: '',
    createdAt: new Date().getTime(),
    priority: null
  };
 
  todoId = null;
 
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private todoService: TodoService, 
    private loadingController: LoadingController
  ) { }
 
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(data => {
      loading.dismiss();
      this.todo = data;
    });
  }
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.router.navigate(['/todos']);
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.router.navigate(['/todos']);
      });
    }
  }
 
}