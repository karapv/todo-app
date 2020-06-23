<template>
  <main id="main">
    <TodoList/>
    <TodoForm/>
  </main>
</template>
<style lang="sass">
  @import "Home"
</style>
<script>
import TodoList from "@/components/todo-list/todo-list";
import TodoForm from "@/components/todo-form/todo-form";
export default {
  name: 'Home',
  components: {TodoForm, TodoList},
  data(){
    return{

    }
  }
}
</script>
