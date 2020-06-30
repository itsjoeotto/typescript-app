<template>
  <v-app>
    <v-main>
      <Todos></Todos>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todos from './components/todo.vue'

@Component({
  components: {
    Todos
  }
})
export default class App extends Vue {
};
</script>
