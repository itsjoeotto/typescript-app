<template>
  <div>
    <v-btn @click="getTodos">Get</v-btn>
    <v-flex ml-5 mr-5>
      <v-text-field v-model="name"></v-text-field>
    </v-flex>
    <v-btn @click="blep">Post</v-btn>
    <template>
      <v-data-table
        :headers="headers"
        :items="toDos"
        :loading="toDos.length === 0"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn @click="changeStatus(item)">Update</v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Todo from '@/models/todos/todo'
const todos = namespace('todos')

@Component
export default class ToDo extends Vue {
  mounted () {
    console.log('mounted')
    this.getTodos()
  }

  private name = ''
  private headers: Array<object> = [
    {
      text: 'Name',
      value: 'name'
    },
    {
      text: 'Complete',
      value: 'isComplete'
    },
    {
      text: 'Actions',
      value: 'actions'
    }
  ]

  public blep (): void {
    console.log(this.name)
    this.postTodos(this.name)
    this.name = ''
  }

  public changeStatus (item: Todo): void {
    console.log(item)
    const request: Todo = { ...item }
    request.isComplete = true
    this.updateTodo(item.id, request)
  }

  @todos.State
  public toDos!: Array<Todo>

  @todos.Action
  public getTodos!: () => void

  @todos.Action
  public postTodos!: (name: string) => void

  @todos.Action
  public updateTodo!: (id: string, item: Todo) => void
}
</script>

<style>

</style>
