import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: localStorage.todos?localStorage.todos:[
      {id: 1,title: 'Todo 1',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
      {id: 2,title: 'Todo 2',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
      {id: 3,title: 'Todo 3',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
    ],
    popup: {enable: false, confirm: false,id: null}
  },
  getters:{
    //Get todos
    getTodos: (state): { id: number; title: string; tasks: [{ id: number; text: string; done: boolean }] } => {
      if(typeof state.todos === 'string') {
        const fromJson = JSON.parse(state.todos);
        return fromJson;
      }else {
        return state.todos;
      }
    },
    //Get popup data
    getPopup: state => state.popup
  },
  mutations: {
    //Create task
    CreateTask:(state,todo): void=>{
      const oldTodo = typeof state.todos === 'string'?JSON.parse(state.todos):state.todos,
            currentTodo = [...oldTodo,todo],
            toJson = JSON.stringify(currentTodo);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    },
    //Change Popup
    changePopup: (state: [{enable: boolean; confirm: boolean; id: null}],popup: [{enable: boolean; confirm: boolean; id: null}]): void=>{
      state.popup = popup;
    },
    //Remove Todo
    removeTodo: (state,todos: { id: number; title: string; tasks: [{ id: number; text: string; done: boolean }] })=>{
      const toJson = JSON.stringify(todos);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    },
    //Do task is done
    taskDone:(state,task)=>{
      const currentState = typeof state.todos === 'string'?JSON.parse(state.todos):state.todos,
            idx = currentState.findIndex((item)=>item.id === task.id);
      currentState[idx] = task;
      const toJson = JSON.stringify(currentState);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    }
  },
  actions: {
    //Create task
    CreateTask:(content,todo: [{id: number; title: string; tasks: [{ id: number; text: string; done: boolean }]}]): void=>{
      content.commit('CreateTask',todo);
    },
    //Change Popup
    changePopup: (content, popup: [{enable: boolean; confirm: boolean; id: null}]): void=>{
      content.commit('changePopup',popup);
    },
    //Remove Todo
    removeTodo: (content, todos: { id: number; title: string; tasks: [{ id: number; text: string; done: boolean }] })=>{
      content.commit('removeTodo',todos);
    },
    //Do task is done
    taskDone: (content, task)=>{
      content.commit('taskDone',task);
    }
  }
})
