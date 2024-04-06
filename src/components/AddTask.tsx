import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import EditTasks from '../util/EditTask';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


interface Props {
  todo: Todo | null;
  isEdit: boolean;
  selectedUser: number;
}

const AddTask: React.FC<Props> = ({ todo, isEdit, selectedUser }) => {
  const [idCounter, setIdCounter] = useState<number>(todo ? todo.id : 1);
  const [title, setTitle] = useState<string>(todo ? todo.title : '');
  const [tasks, setTasks] = useState<Todo[]>([]);


  useEffect(() => {
    const formDataString: string | null = localStorage.getItem('tasks');
    if (formDataString !== null) {
      const storedTasks: Todo[] = JSON.parse(formDataString);
      setTasks(storedTasks);
      
      const maxId: number = storedTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
      setIdCounter(maxId + 1);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: isEdit ? todo!.id : idCounter,
      title: title,
      userId: isEdit ? todo!.userId : selectedUser,
      completed: isEdit ? todo!.completed: false
    };

    if (isEdit) {
      EditTasks(newTodo);
      return;
    }

    setTasks([...tasks, newTodo]);
    localStorage.setItem('tasks', JSON.stringify([newTodo, ...tasks]));

    setIdCounter(idCounter + 1);
    setTitle('');
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded">
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isEdit ? (todo?.completed ? "Uncomplete Task" : "Save") : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
