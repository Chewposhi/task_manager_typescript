interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


function EditTasks(newTodo: Todo): void {
  console.log(newTodo);

  const formDataString: string | null = localStorage.getItem('tasks');

  if (formDataString) {
    const storedTodos: Todo[] = JSON.parse(formDataString);
    const updatedTodos: Todo[] = storedTodos.map(todo => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTodos));
    window.location.reload();
  } else {
    console.log('No form data found in local storage');
  }
}

export default EditTasks;
