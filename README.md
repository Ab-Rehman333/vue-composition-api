1 . Make a form and use submit event on that
2 . make ul li and make class of completed with line throught
3 . make edit delete completed buttons with li

<!-- logic scripts 
 -->
1. use ref and reactive states
2. define the todotext var with ref 
3. define the reactive state that should have todos array null 
4. define a variable with editingTodo to null
5. make a function that you already set with submit event on form 
6. check if the value is empty with trim() 
7. check if editingTodo is true then we should set the editingTodo to todoTextValue and editingTodo is equal to null
8. else we need to create a object called newTodo that should have id , text , completed and we need to set the id todoList.todos.length +1 and we need to set todoText.value equal to text and completed should be by default false 
9. after that we are ready to push the newTodo object into the todos list 
10. after that we need to clear the fields
11. make a edit todo function that should receive the todo and set that todo equal to  editingTodo variable and todoText.value equal to taken todo.value
12. make a delteTodo function that should receive the todo and then you need to find the index of that todo in the todoList.todos array and check if index is not equal to -1 then splice that index from array 
13. make completed function that should receive the todo then you need to set that that taken todo opposite of his own value (e.g if it's true then it should set to false if false then true)