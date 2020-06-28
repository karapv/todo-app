<template>
    <div class="container todo">
        <div class="row">
            <div class="col-lg-12">
                <span class="btns  btn-todo  btn-back" @click="backToHome" v-b-tooltip.right.hover title="Back to home page"><vue-fontawesome icon="home"></vue-fontawesome></span>
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
                        <span class="btns btn-change btn-todo btn-todo-change" @click="changeText('enableTitle',enableTitle)" v-b-tooltip.hover title="Change title"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
                    </div>
                </div>
                <ul class="task-list">
                        <li class="grid-container task-list-item" v-for="task in currentTodo.tasks" :key="task.id">
                            <span :class="{'task-check': true,'done': task.done,'btn-todo btn-todo-done': true}" @click="taskDone(task.id)" v-b-tooltip.hover title="Do task is done"><vue-fontawesome icon="check"></vue-fontawesome></span>
                            <b-form-textarea type="text" :class="['task-text',`task-number-${task.id}`]" v-model="task.text" disabled></b-form-textarea>
                            <div class="todo-btns-container">
                                <span class="btns btn-delete btn-todo btn-todo-delete" @click="deleteTask(task.id)" v-b-tooltip.hover title="Delete Task"><vue-fontawesome icon="trash"></vue-fontawesome></span>
                                <span class="btns btn-change btn-todo btn-todo-change" @click="changeText(task.id)" v-b-tooltip.hover title="Change text in task"><vue-fontawesome icon="pencil"></vue-fontawesome></span>
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
                    <span class="btns btn-save btn-todo btn-save" @click="createNewTask" v-b-tooltip.hover title="Add new task"><vue-fontawesome icon="plus"></vue-fontawesome></span>
                </div>
                <div class="grid-container todo-buttons">
                    <span  class="btns btn-save btn-todo btn-todo-save" @click="saveTodo" v-b-tooltip.hover title="Save changes">
                        <vue-fontawesome icon="save" v-show="!saveChanges"></vue-fontawesome>
                        <vue-fontawesome icon="check" v-show="saveChanges"></vue-fontawesome>
                    </span>
                    <span class="btns btn-delete btn-todo" @click="deleteTodo" v-b-tooltip.hover title="Delete Todo"><vue-fontawesome icon="trash"></vue-fontawesome></span>
                    <span class="btns btn-cancel btn-todo" @click="cancelChanges" v-b-tooltip.hover title="Cancel  changes"><vue-fontawesome icon="times"></vue-fontawesome></span>
                    <span class="btns btn-todo btn-todo-undo" @click="returnVersion" v-b-tooltip.hover title="Cancel previos changes"><vue-fontawesome icon="undo"></vue-fontawesome></span>
                    <span  class="btns btn-todo btn-todo-backward" @click="returnChanges" v-b-tooltip.hover title="Previous changes"><vue-fontawesome icon="backward"></vue-fontawesome></span>
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
    import router from "@/router";
    import Helper from "@/helpers/helper";

    const helper = new Helper();
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
               isDelete: false,
               taskDelete: {id:null,delete:false},
               cancelChange: false,
               previousVersion: 0,
               previousChanges: 0
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
            if(idx === -1){
                router.push({ name: 'NotFound' });
            }else {
                this.currentTodo = this.getTodos[idx];
                if (localStorage.version) {
                    localStorage.removeItem('version');
                }
                if (localStorage.versionsTodo) {
                    localStorage.removeItem('versionTodo');
                }
                localStorage.version = this.version++;
                const currentVersions = [{version: this.version, todos: this.currentTodo}];
                localStorage.versionsTodo = JSON.stringify(currentVersions);
            }
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
                      //Confirm task delete
                      this.currentTodo.tasks = this.currentTodo.tasks.filter((item) => {
                          if (item.id !== this.taskDelete.id) {
                              return item;
                          }
                      });
                      this.taskDelete.delete = false;
                  }else if(this.cancelChange){
                      //Confirm cancel changes
                      const oldObj = JSON.parse(localStorage.versionsTodo);
                      this.currentTodo = oldObj[0].todos;
                      this.cancelChange = false;
                  }else if(this.isDelete){
                      //Confirm todo delete
                      const newTodos: [{id: number; title: string; todos: [{id: number; text: string; done: boolean}]}]= this.getTodos.filter((item)=>{
                          if(item.id !== this.currentTodo.id){
                              return item
                          }
                      });
                      localStorage.removeItem('version');
                      localStorage.removeItem('versionsTodo');
                      this.$store.dispatch('removeTodo', newTodos);
                      router.push({ name: 'Home' });
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
            //Back to home page
            backToHome(): void{
                localStorage.removeItem('version');
                localStorage.removeItem('versionsTodo');
                router.push({ name: 'Home' });
            },
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
                        id: number = helper.generateId(),
                        oldObj: [{id: number; text: string; done: boolean}] = this.currentTodo.tasks,
                        newObj: {id: number; text: string; done: boolean} = {
                            id,
                            text: currentText,
                            done: false
                        };
                    this.currentTodo.tasks = [...oldObj, newObj];
                    this.currentTask = '';
                }else {
                    this.checkTask = true;
                }
            },
            cancelChanges(): void{
                this.cancelChange = true;
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false});
            },
            //Return changes
            returnChanges(): void{
              if(localStorage.versionsTodo) {
                  const fromJson = JSON.parse(localStorage.versionsTodo);
                  if(this.previousVersion === 0){
                      this.previousVersion = fromJson[fromJson.length-1].version;
                  }
                  if(this.previousVersion>1){
                      this.previousChanges = this.previousVersion;
                      this.previousVersion = this.previousVersion -1;
                      const idx = fromJson.findIndex((item)=>item.version == this.previousVersion);
                      this.currentTodo = fromJson[idx].todos;
                      console.log(`PrevV:${this.previousVersion}`);
                  }
              }
            },
            //Return previos version
            returnVersion(): void{
                if(localStorage.versionsTodo){
                    const fromJson = JSON.parse(localStorage.versionsTodo);
                    if(this.previousChanges === 0){
                        this.previousChanges = fromJson[fromJson.length-1].version;
                    }
                    if(this.previousChanges<=fromJson[fromJson.length-1].version){
                        this.previousChanges = this.previousVersion+=1;
                        this.previousVersion = this.previousChanges;
                        const idx = fromJson.findIndex((item)=>item.version == this.previousChanges);
                        this.currentTodo = fromJson[idx].todos;
                    }
                }
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
                    localStorage.removeItem('version');
                    localStorage.removeItem('versionsTodo');
                }

            },
            //Delete todo
            deleteTodo(): void{
                this.isDelete = true;
                this.$store.dispatch('changePopup',{enable: true, confirm: false, cancel: false});
            }
        }
    }
</script>

