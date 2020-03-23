import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //  Utiliza-se : noangular para tipar as variaveis//
  // any significa qualquer tipagem ou objeto msg date boolean//
  public mode = 'list';
  public todos: Todo[] = []; // vazio //
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  /*
   para criar uns contrutor "ctor"
   */
  // ordem para criar deve seguir a model.ts//
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([ // composer para mais de um validator//
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }


  add() {
    // ou assim: this.form.value => { title: 'Titulo'}
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  // para retornar ou tipar o metodo usa-se <remove(todo: Todo): Todo>
  // quando não coloca-se nada ele é ANY default
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) { // verificação de todo//
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  // local storage(salva ate se desligar a maquina) session storage(fecho a aba perdeu)
  save() {
    // converte o obj json em uma string
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    // converte uma string em um json//
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
    this.todos = JSON.parse(data);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
