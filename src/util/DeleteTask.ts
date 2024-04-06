// Function to update the values of objects based on date comparison
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function DeleteTasks(id: number): void {
  const formDataString: string | null = localStorage.getItem('tasks');

  if (formDataString) {
      // Parse the JSON string to convert it into an object
      const storedTodos: Todo[] = JSON.parse(formDataString);
      const filteredTodos: Todo[] = storedTodos.filter(todo => todo.id !== id);
      localStorage.setItem('tasks', JSON.stringify(filteredTodos));
      window.location.reload();
  } else {
      console.log('No form data found in local storage');
  }
}

export default DeleteTasks;
