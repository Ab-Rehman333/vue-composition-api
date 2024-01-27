<script setup>
import { ref, reactive } from "vue";

let todoText = ref('');
let todoList = reactive({
  todos: [],
});

let editingTodo = null;

const addNewTodo = () => {
  if (todoText.value.trim() !== "") {
    if (editingTodo) {

      editingTodo.text = todoText.value;
      editingTodo = null;
    } else {

      const newTodo = {
        id: todoList.todos.length + 1,
        text: todoText.value,
        completed: false,
      };
      todoList.todos.push(newTodo);
    }

    todoText.value = '';
  }
};

const editTodo = (todo) => {
  editingTodo = todo;
  todoText.value = todo.text;
};

const deleteTodo = (todo) => {
  const index = todoList.todos.indexOf(todo);
  if (index !== -1) {
    todoList.todos.splice(index, 1);
  }
};

const completedTodo = (todo) => {
  todo.completed = !todo.completed;
};
</script>

<template>
  <div>
    <div class="todo_wrapper container">
      <form @submit.prevent="addNewTodo">
        <div class="row">
          <div class="col-md-12">
            <label>Add New Todo</label>
            <input v-model="todoText" class="form-control" placeholder="Add New Todo">
          </div>
        </div>
      </form>

      <ul class="list-group mt-3">
        <li v-for="todo in todoList.todos" :key="todo.id" class="list-group-item mt-4"
          :class="{ 'completed': todo.completed }">
          {{ todo.text }}
          <!-- Edit button with FontAwesome icon -->
          <button @click="editTodo(todo)" class="btn btn-sm btn-primary ml-2">
            <font-awesome-icon icon="edit" />
          </button>

          <!-- Delete button with FontAwesome icon -->
          <button @click="deleteTodo(todo)" class="btn btn-sm btn-danger ml-2">
            <font-awesome-icon icon="trash-alt" />
          </button>

          <!-- Completed button with FontAwesome icon -->
          <button @click="completedTodo(todo)" class="btn btn-sm btn-success ml-2">
            <font-awesome-icon icon="check" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import '@fortawesome/fontawesome-svg-core/styles.css';

.completed {
  text-decoration: line-through;
}
</style>
