<template>
    <div class="container">
        <div class="row">
            <b-form class="col-lg-12 todo-form" @submit="createTodo($event)">
                <h4 class="todo-form-title">Create new Todo</h4>
                <b-form-group
                        id="input-group-1"
                        label="Title"
                        label-for="input-1"
                        class="todo-form-label"
                >
                    <b-form-input
                            id="input-1"
                            v-model.lazy="todo.title"
                            type="text"
                            placeholder="Enter title for your todo"
                            class="todo-form-input"
                    ></b-form-input>
                    <p class="error" v-show="checkTitle">You must add a title.</p>
                </b-form-group>
                <div class="grid-container todo-form-task-container">
                    <div class="todo-form-task-area">
                        <label for="textarea-default" class="todo-form-label">Add your task</label>
                        <b-form-textarea
                                id="textarea-default"
                                placeholder="Text..."
                                v-model.lazy="currentTask"
                        ></b-form-textarea>
                        <p class="error" v-show="checkTask">You must add a task.</p>
                    </div>
                    <span  class="btns btn-save" @click="addNewTask"><vue-fontawesome icon="plus"></vue-fontawesome></span>
                </div>
                <div class="todo-form-goals-container" v-if="isTask">
                    <ol class="todo-form-goals">
                        <li class="todo-form-goals-item" v-for="task in todo.tasks" :key="task.id">{{task.text}} <span class="todo-form-goals-btn" @click="removeTask(task.id)"><vue-fontawesome icon="times"></vue-fontawesome></span></li>
                    </ol>
                </div>
                <input type="submit"  class="btn btn-success todo-form-btn-submit" value="Create Todo" v-b-tooltip.hover title="Create todo">
            </b-form>
        </div>
    </div>
</template>
<style lang="sass">
    @import "todo-form"
</style>
<script lang="ts">
    import {mapGetters} from "vuex";
    import Helper from "@/helpers/helper";
    const helper = new Helper();
    export default {
        name: 'TodoForm',
        data(){
            return{
                todo:{
                    id: '',
                    title: '',
                    tasks: []
                },
                currentTask: null,
                isTask: false,
                checkTitle: false,
                checkTask: false,
                confirmPopup: false
            }
        },
        computed:{
          ...mapGetters([
              'getPopup'
          ])
        },
        watch:{
         'todo.tasks': function(arr){
             if(arr.length>0){
                 this.isTask = true;
             }
         },
          //open popup
         'getPopup': function (popup) {
             if(popup.confirm){
              this.todo.tasks = helper.deleteItem(this.todo.tasks,popup);
              localStorage.currentTodo = JSON.stringify(this.todo.tasks);
             }
         }   
        },
        mounted(){
          if(localStorage.currentTodo){
                const toJson = JSON.parse(localStorage.currentTodo);
                this.todo.tasks = toJson;
          }

        },
        methods:{
            //Add new Task
            addNewTask(): void{
               const checkText = [...this.currentTask];
               if(checkText.length>0){
                   this.checkTask = false;
                  const currentText: string = this.currentTask,
                       id: number = helper.generateId(),
                       oldObj: [{id: number; text: string; done: boolean}] = this.todo.tasks,
                       newObj: [{id: number; text: string; done: boolean}] = {
                          id,
                          text: currentText,
                          done: false
                      },
                      currentTask: [{id: number; text: string; done: boolean}] = [...oldObj,newObj];
                  this.todo.tasks = currentTask;
                  localStorage.currentTodo = JSON.stringify(currentTask);
                  this.currentTask = '';
               }else {
                  this.checkTask = true;
               }
            },
            // Remove task
            removeTask(id: number): void{
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false,id: id});
            },
            //Createw new todo
            createTodo(e: { preventDefault: () => void }): void{
                e.preventDefault();
                const currentTodoTitle = [...this.todo.title],
                      currentTask = this.todo.tasks;
                if(currentTodoTitle.length ===0){
                    this.checkTitle = true;
                }else if(currentTask.length === 0){
                    this.checkTask = true;
                }else{
                    this.checkTitle = false;
                    this.checkTask = false;
                    const id: number =  helper.generateId();
                    this.$store.dispatch('CreateTask',{id:id ,title: this.todo.title, tasks: this.todo.tasks});
                    localStorage.currentTodo = '';
                    this.todo = {
                        id: '',
                        title: '',
                        tasks: []
                    }
                }
            }
        }
    }
</script>