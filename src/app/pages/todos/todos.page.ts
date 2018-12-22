import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/_classes/todo';
import { TodoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todo$: Todo[];
  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()    
      .subscribe(data => {
        // console.log(data);
        this.todo$ = data; 
      })
  }

  remove(item: Todo) {
    console.log(item);
    this.todoService.removeTodo(item.id);
  }
}
