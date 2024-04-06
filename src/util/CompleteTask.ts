function CompleteTasks(id: number): void {
    const formDataString: string | null = localStorage.getItem('tasks');
  
    if (formDataString) {
      // Parse the JSON string to convert it into an object
      const storedTodos: any[] = JSON.parse(formDataString);
  
      // Update the todo with the specified id
      const updatedTodos: any[] = storedTodos.map(todo => {
        if (todo.id === id) {
          // Return a new object with the completed property updated
          return { ...todo, completed: true };
        }
        // For non-matching IDs, return the original object
        return todo;
      });
  
      // Move the updated todo to the first position
      const index = updatedTodos.findIndex(todo => todo.id === id);
      const updatedTodo = updatedTodos.splice(index, 1)[0];
      updatedTodos.unshift(updatedTodo);
  
      // Update the localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTodos));
      window.location.reload();
    } else {
      console.log('No form data found in local storage');
    }
  }
  
  // Export the function to be used in other files
  export default CompleteTasks;
  