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
                                v-model="currentTodo.title"
                                type="text"
                                class="todo-form-input"
                                :disabled="!enableTitle"
                        ></b-form-input>
                        <p class="error" v-show="checkTitle">You must add a title.</p>
                    </b-form-group>
                    <div class="todo-btns-container">
                        <span class="btns btn-change btn-todo btn-todo-change" @click="changeText('enableTitle',enableTitle)"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
                    </div>
                </div>
                <ul class="task-list">
                        <li class="grid-container task-list-item" v-for="task in currentTodo.tasks" :key="task.id">
                            <span :class="{'task-check': true,'done': task.done,'btn-todo btn-todo-done': true}" @click="taskDone(task.id)"><vue-fontawesome icon="check"></vue-fontawesome></span>
                            <b-form-textarea type="text" :class="['task-text',`task-number-${task.id}`]" v-model="task.text" disabled></b-form-textarea>
                            <div class="todo-btns-container">
                                <span class="btns btn-delete btn-todo btn-todo-delete" @click="deleteTask(task.id)"><vue-fontawesome icon="trash"></vue-fontawesome></span>
                                <span class="btns btn-change btn-todo btn-todo-change" @click="changeText(task.id)"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
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
                        <p class="error" v-show="checkTask">You must add text in task.</p>
                    </div>
                    <span class="btns btn-save btn-todo btn-save" @click="createNewTask"><vue-fontawesome icon="plus"></vue-fontawesome></span>
                </div>
                <div class="grid-container todo-buttons">
                    <span  class="btns btn-save btn-todo btn-todo-save" @click="saveTodo">
                        <vue-fontawesome icon="save" v-show="!saveChanges"></vue-fontawesome>
                        <vue-fontawesome icon="check" v-show="saveChanges"></vue-fontawesome>
                    </span>
                    <span class="btns btn-delete btn-todo" ><vue-fontawesome icon="trash"></vue-fontawesome></span>
                    <span class="btns btn-cancel btn-todo" @click="cancelChanges"><vue-fontawesome icon="times"></vue-fontawesome></span>
                    <span class="btns btn-todo btn-todo-undo"><vue-fontawesome icon="undo"></vue-fontawesome></span>
                    <span  class="btns btn-todo btn-todo-backward"><vue-fontawesome icon="backward"></vue-fontawesome></span>
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
               version: localStorage.version?localStorage.version:0,
               newTask: '',
               checkTitle: false,
               enableTitle: false,
               checkTask: false,
               saveChanges: false,
               taskDelete: {id:null,delete:false},
               cancelChange: false
            }
        },
        computed:{
            ...mapGetters([
                'getTodos',
                'getPopup'
            ])
        },
        created(): void {
            const currentId = +this.$route.params.id;
            const idx = this.getTodos.findIndex((item)=>item.id === currentId);
            this.currentTodo = this.getTodos[idx];
            if(localStorage.version){
                localStorage.removeItem('version');
            }
            localStorage.version = this.version++;
            const currentVersions = [{version:this.version,todos:this.currentTodo}];
            const toJSON = JSON.stringify(currentVersions);
            localStorage.versionsTodo = toJSON;
        },
        watch:{
          'getTodos' :function () {
                const currentId = +this.$route.params.id;
                const idx = this.getTodos.findIndex((item)=>item.id === currentId);
                this.currentTodo = this.getTodos[idx];
          },
          'getPopup': function(popup){
              if(popup.confirm) {
                  if(this.taskDelete.delete) {
                      this.currentTodo.tasks = this.currentTodo.tasks.filter((item) => {
                          if (item.id !== this.taskDelete.id) {
                              return item;
                          }
                      });
                      this.taskDelete.delete = false;
                  }else if(this.cancelChange){
                      const oldObj = JSON.parse(localStorage.versionsTodo);
                      this.currentTodo = oldObj[0].todos;
                      this.cancelChange = false;
                  }
              }
          },
        },
        beforeUpdate(){
            localStorage.version = this.version++;
            const oldVersion = JSON.parse(localStorage.versionsTodo);
            const newObj = [...oldVersion,{version:this.version,todos:this.currentTodo}];
            const toJSON = JSON.stringify(newObj);
            localStorage.versionsTodo = toJSON;
        },
        methods:{
            //Do task is done
            taskDone(id: number): void{
                 const idx = this.currentTodo.tasks.findIndex((item)=>item.id === id);
                 this.currentTodo.tasks[idx].done =  !this.currentTodo.tasks[idx].done;
            },
            //Change text
            changeText(property: string,value: boolean|string = 'disabled'): void{
                if(value !== 'disabled') {
                    this.$data[property] = !value;
                }else{
                    document.querySelector(`.task-number-${property}`).toggleAttribute('disabled');
                }
            },
            //Delete task
            deleteTask(id: number): void{
                this.taskDelete = {id: id,delete: true};
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false});
            },
            //Create new task
            createNewTask(): void{
                const checkText = [...this.newTask];
                if(checkText.length>0){
                    this.checkTask = false;
                    const currentText: string = this.newTask,
                        currentDate = new Date(),
                        id: number = currentDate.getTime()+2,
                        oldObj: [{id: number; text: string; done: boolean}] = this.currentTodo.tasks,
                        newObj: [{id: number; text: string; done: boolean}] = {
                            id,
                            text: currentText,
                            done: false
                        },
                        currentTask: [{id: number; text: string; done: boolean}] = [...oldObj,newObj];
                    this.currentTodo.tasks = currentTask;
                    this.currentTask = '';
                }else {
                    this.checkTask = true;
                }
            },
            cancelChanges(){
                this.cancelChange = true;
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false});
            },
            //Save todo
            saveTodo(): void{
                const checkTitle = [...this.currentTodo.title];
                if(checkTitle.length === 0){
                    this.checkTitle = true;
                }else{
                    document.querySelectorAll('.task-text').forEach((item)=>{
                        item.setAttribute('disabled','disabled');
                    });
                    this.checkTitle = false;
                    this.saveChanges = !this.saveChanges;
                    this.$store.dispatch('saveTodo',this.currentTodo);
                    localStorage.remove('version');
                    localStorage.remove('versionsTodo');
                }

            }
        }
    }
</script>

