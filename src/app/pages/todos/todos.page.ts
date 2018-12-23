import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/_classes/todo';
import { TodoService } from 'src/app/_services/todo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todo$: Todo[];
  constructor(
    private todoService: TodoService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  async getTodos() {
    const loading = await this.loadingController.create({
      message: 'Loading Todos...'
    });
    await loading.present();

    this.todoService.getTodos()    
      .subscribe(data => {
        // console.log(data);
        loading.dismiss();
        this.todo$ = data; 
      })
  }

  remove(item: Todo) {
    console.log(item);
    this.todoService.removeTodo(item.id);
  }
}
