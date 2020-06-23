import Vue from 'vue'
import Vuex from 'vuex'

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
    getTodos: (state): { id: number; title: string; tasks: { id: number; text: string; done: boolean }[] }[] => {
      if(typeof state.todos === 'string') {
        const fromJson = JSON.parse(state.todos);
        return fromJson;
      }else {
        return state.todos;
      }
    },
    getPopup: state => state.popup
  },
  mutations: {
    CreateTask:(state,todo): void=>{
      const oldTodo = typeof state.todos === 'string'?JSON.parse(state.todos):state.todos,
            currentTodo = [...oldTodo,todo],
            toJson = JSON.stringify(currentTodo);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    },
    changePopup: (state: [{enable: boolean; confirm: boolean; id: null}],popup: [{enable: boolean; confirm: boolean; id: null}]): void=>{
      state.popup = popup;
    },
    changeTodo: (state,todos)=>{
      const toJson = JSON.stringify(todos);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    }
  },
  actions: {
    CreateTask:(content,todo: [{id: number; title: string; tasks: [{ id: number; text: string; done: boolean }]}]): void=>{
      content.commit('CreateTask',todo);
    },
    changePopup: (content, popup: [{enable: boolean; confirm: boolean; id: null}]): void=>{
      content.commit('changePopup',popup);
    },
    changeTodo: (content, todos)=>{
      content.commit('changeTodo',todos);
    }
  }
})
