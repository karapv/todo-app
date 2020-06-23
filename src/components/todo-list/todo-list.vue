<template>
    <div class="container todo-list">
        <div class="row">
            <div class="col-lg-12 todo-list-item" v-for="todo in getTodos" :key="todo.id">
                <div class="todo-list-item-container">
                    <header class="grid-container todo-list-item-header">
                        <h4 class="todo-list-item-title">{{todo.title}}</h4>
                        <div class="grid-container todo-list-item-buttons">
                            <div class="btns btn-change"><vue-fontawesome icon="pencil"></vue-fontawesome></div>
                            <div class="btns btn-delete"><vue-fontawesome icon="trash"></vue-fontawesome></div>
                        </div>
                    </header>
                    <footer class="todo-list-item-footer">
                        <ul class="todo-list-goals">
                            <li class="todo-list-goals-item" v-for="tasks in todo.tasks.slice(0, 2)"  :key="tasks.id"><span :class="{'task-check': true,'done': tasks.done}"><vue-fontawesome icon="check"></vue-fontawesome></span> {{tasks.text}}</li>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "todo-list"
</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'TodoList',
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'getTodos'
            ])
        }
    }
</script>
