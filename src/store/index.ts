import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: localStorage.todos?localStorage.todos:[
      {id: 1,title: 'Todo 1',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
      {id: 2,title: 'Todo 2',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
      {id: 3,title: 'Todo 3',tasks:[{id:1,text: 'My goal',done: false},{id:2,text: 'My goal',done: false},{id:3,text: 'My goal',done: false},{id:4,text: 'My goal',done: false}]},
    ]
  },
  getters:{
    getTodos: (state): { id: number; title: string; tasks: { id: number; text: string; done: boolean }[] }[] => {
      if(typeof state.todos === 'string') {
        const fromJson = JSON.parse(state.todos);
        return fromJson;
      }else {
        return state.todos;
      }
    }
  },
  mutations: {
    CreateTask:(state,todo): void=>{
      const oldTodo = state.todos,
            currentTodo = [...oldTodo,todo],
            toJson = JSON.stringify(currentTodo);
      localStorage.todos = toJson;
      state.todos = localStorage.todos;
    }
  },
  actions: {
    CreateTask:(content,todo: [{id: number; title: string; tasks: [{ id: number; text: string; done: boolean }]}]): void=>{
      content.commit('CreateTask',todo);
    }
  }
})
