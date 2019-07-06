export type TodoType = {
  description: String,
  isDone: Boolean,
  todoId: Number
}

export type TodoListType = {
  listName: String,
  listId: Number,
  listData: TodoType[]
}