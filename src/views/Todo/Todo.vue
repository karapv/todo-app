<template>
    <div class="container todo">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="todo-title">Edit Todo</h1>
                <div class="grid-container todo-item">
                    <b-form-group
                            id="input-group-1"
                            label="Title"
                            label-for="input-1"
                            class="todo-form-label"
                    >
                        <b-form-input
                                id="input-1"
                                v-model.lazy="currentTodo.title"
                                :value="currentTodo.title"
                                type="text"
                                class="todo-form-input"
                                disabled
                        ></b-form-input>
                        <p class="error" v-show="checkTitle">You must add a title.</p>
                    </b-form-group>
                    <div class="todo-btns-container">
                        <span class="btns btn-change btn-todo btn-todo-change"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
                        <span  class="btns btn-save btn-todo btn-todo-save hidden-btn"><vue-fontawesome icon="plus"></vue-fontawesome></span>
                    </div>
                </div>
                <ul class="task-list">
                        <li class="grid-container task-list-item" v-for="task in currentTodo.tasks" :key="task.id">
                            <span :class="{'task-check': true,'done': task.done,'btn-todo btn-todo-done': true}" @click="taskDone(task.id)"><vue-fontawesome icon="check"></vue-fontawesome></span>
                            <b-form-textarea type="text" class="task-text" v-model="task.text" disabled></b-form-textarea>
                            <div class="todo-btns-container">
                                <span class="btns btn-delete btn-todo btn-todo-delete" ><vue-fontawesome icon="trash"></vue-fontawesome></span>
                                <span class="btns btn-change btn-todo btn-todo-change"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
                                <span  class="btns btn-save btn-todo btn-todo-save hidden-btn"><vue-fontawesome icon="plus"></vue-fontawesome></span>
                            </div>
                        </li>
                </ul>
                <div class="grid-container todo-item">
                    <div class="todo-task-area">
                        <label for="textarea-default" class="todo-form-label">Add your task</label>
                        <b-form-textarea
                                id="textarea-default"
                                placeholder="Text..."
                                v-model="newTask"
                        ></b-form-textarea>
                        <p class="error" v-show="checkTask">You must add a task.</p>
                    </div>
                    <span class="btns btn-save btn-todo btn-save" ><vue-fontawesome icon="plus"></vue-fontawesome></span>
                </div>
            </div>

        </div>
    </div>
</template>
<style  lang="sass">
@import "Todo"
</style>
<script lang="ts">
    import {mapGetters} from "vuex";
    export default {
        name: "Todo",
        data(){
            return{
               currentTodo: [],
               newTask: '',
               checkTitle: false,
               checkTask: false,
               saveChanges: false
            }
        },
        computed:{
            ...mapGetters([
                'getTodos',
            ])
        },
        created(): void {
            const currentId = +this.$route.params.id;
            const idx = this.getTodos.findIndex((item)=>item.id === currentId);
            this.currentTodo = this.getTodos[idx];
        },
        methods:{
            taskDone(id: number): void{
                 const newTodo = this.currentTodo.tasks.filter((item)=>{
                     if(item.id === id){
                         item.done = true;
                     }
                 });
                 this.$store.dispatch('changeTodo',newTodo);
            }
        }
    }
</script>

