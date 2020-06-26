<template>
    <div class="container todo-list">
            <transition-group name="list" class="row" tag="div">
            <div class="col-lg-12 todo-list-item" v-for="todo in getTodos" :key="todo.id">
                <div class="todo-list-item-container">
                    <header class="grid-container todo-list-item-header">
                        <h4 class="todo-list-item-title">{{todo.title}}</h4>
                        <div class="grid-container todo-list-item-buttons">
                            <div class="btns btn-change" @click="viewTodo(todo.id)"><vue-fontawesome icon="pencil"></vue-fontawesome></div>
                            <div class="btns btn-delete" @click="deleteTodo(todo.id)"><vue-fontawesome icon="trash"></vue-fontawesome></div>
                        </div>
                    </header>
                    <footer class="todo-list-item-footer">
                        <ul class="todo-list-goals" >
                            <li class="todo-list-goals-item" v-for="tasks in todo.tasks.slice(0, todo.tasks.length>1?2:1)"  :key="tasks.id"><span :class="{'task-check': true,'done': tasks.done}">
                                <vue-fontawesome icon="check"></vue-fontawesome></span> {{tasks.text}}</li>
                        </ul>
                    </footer>
                </div>
            </div>
            </transition-group>
    </div>
</template>
<style lang="sass">
    @import "todo-list"
</style>
<script lang="ts">
    import { mapGetters } from 'vuex';
    import router from '@/router';
    export default {
        name: 'TodoList',
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'getTodos',
                'getPopup'
            ])
        },
        watch: {
            'getPopup': function (popup) {
                if(popup.confirm){
                    const newTodos: [{id: number; title: string; todos: [{id: number; text: string; done: boolean}]}]= this.getTodos.filter((item)=>{
                        if(item.id !== popup.id){
                            return item
                        }
                    });
                    this.$store.dispatch('removeTodo', newTodos);
                }
            }
        },
        methods:{
            //Delete Todo
            deleteTodo(id: number): void {
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false,id: id});
            },
            // View todo
            viewTodo(id: number): void{
                router.push({path: `/todo/${id}`});
            }
        }

    }
</script>
