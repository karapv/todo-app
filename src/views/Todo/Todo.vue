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
                    <div class="btns btn-change"><vue-fontawesome icon="pencil"></vue-fontawesome></div>
                </div>
                <div class="grid-container todo-item">
                    <label for="textarea-default" class="todo-form-label">Add your task</label>
                    <b-form-textarea
                            id="textarea-default"
                            placeholder="Text..."
                            v-model.lazy="newTask"
                    ></b-form-textarea>
                    <p class="error" v-show="checkTask">You must add a title.</p>
                </div>
            </div>

        </div>
    </div>
</template>
<style  lang="sass">

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
               checkTask: false
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
        }
    }
</script>

