import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import TaskPanel from "./components/TaskPanel";
import AddButton from "./components/AddButton";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<number>(1);

  useEffect(() => {
    // Read data from local storage
    const formDataString = localStorage.getItem('tasks');
    if (formDataString) {
      // Parse the JSON string to convert it into an object
      const storedTodos: Todo[] = JSON.parse(formDataString);
      setTodos(storedTodos); 
      setLoading(false);
    } else {
        console.log('No form data found in local storage, fetching from dummy');
        fetchTodos();
    }

    // read last user from local storage
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
        setUser(parseInt(lastUser)); // Parse lastUser to integer
        setLoading(false);
    } else {
        console.log('No form data found in local storage, fetching from dummy');
        setUser(1);
        localStorage.setItem('lastUser', JSON.stringify(1));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastUser', JSON.stringify(user));
  }, [user]);


  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
      localStorage.setItem('tasks', JSON.stringify(data));
      console.log(data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  return (
    <div className="relative z-0">
      <Hero selectedUser={user} onUserChange={setUser}/>
      {loading ? (
        <div>Loading...</div> // Render loading indicator
      ) : (
        <div>
        <AddButton selectedUser={user}/>
        <TaskPanel todos={todos} selectedUser={user}/>
        </div>
      )}
    </div>
  );
  
}

export default App;
