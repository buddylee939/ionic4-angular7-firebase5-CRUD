import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'todos', loadChildren: './pages/todos/todos.module#TodosPageModule' },
  { path: 'posts', loadChildren: './pages/posts/posts.module#PostsPageModule' },
  { path: 'post/new', loadChildren: './pages/posts/post-new/post-new.module#PostNewPageModule' },
  { path: 'post/edit/:id', loadChildren: './pages/posts/post-edit/post-edit.module#PostEditPageModule' },
  { path: 'post/:id', loadChildren: './pages/posts/post-detail/post-detail.module#PostDetailPageModule' },
  { path: 'data', loadChildren: './data/data.module#DataPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
