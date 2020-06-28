<template>
  <main id="main">
    <TodoList/>
    <TodoForm/>
  </main>
</template>
<style lang="sass">
  @import "Home"
</style>
<script lang="ts">
import TodoList from "@/components/todo-list/TodoList.vue";
import TodoForm from "@/components/todo-form/TodoForm.vue";
export default {
  name: 'Home',
  components: {TodoForm, TodoList},
  data(){
    return{

    }
  }
}
</script>
