import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import ToDo from '@/models/todos/todo'

@Module({ namespaced: true })
class Todos extends VuexModule {
  public toDos: Array<ToDo> = []

  @Mutation
  public setTodos (items: Array<ToDo>): void {
    this.toDos = items
  }

  @Mutation
  public addTodo (item: ToDo): void {
    this.toDos.push(item)
  }

  @Action({ rawError: true })
  public getTodos (): void {
    axios.get('https://localhost:5001/api/TodoItems')
      .then(res => {
        console.log('RES', res.data)
        this.context.commit('setTodos', res.data)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  @Action
  public postTodos (name: string): void {
    const request = { name: name, isComplete: false }
    axios.post('https://localhost:5001/api/TodoItems', request)
      .then(res => {
        console.log('POST RES', res.data)
        this.context.commit('addTodo', res.data)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  @Action
  public updateTodo (id: string, item: ToDo): void {
    axios.put(`https://localhost:5001/api/TodoItems/${id}`, { id: id, todoItem: item })
      .then(res => {
        console.log('PUT Res', res)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}

export default Todos
