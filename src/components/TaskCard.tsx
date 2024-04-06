import React from 'react';
// import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { TiTickOutline } from "react-icons/ti";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import DeleteTasks from '../util/DeleteTask';
import CompleteTasks from '../util/CompleteTask';
import AddTask from './AddTask';

interface TodoProps {
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
  selectedUser: number;
}

const Todo: React.FC<TodoProps> = ({ todo, selectedUser }) => {
  // delete task
  const onDeleteTask = (id: number) => {
    DeleteTasks(id);
  }

  // complete task
  const onCompleteTask = (id: number) => {
    CompleteTasks(id);
  }

  return (
    <div className={`flex flex-col gap-2 sm:flex-row justify-between items-center mx-auto my-2 text-white green-pink-gradient rounded-lg p-4 w-11/12 sm:w-full`} key={todo.id}>
      <div className="mb-2 sm:mb-0 w-[300px]">
          <p className="font-bold overflow-auto text-center custom-scrollbar hover:cursor-pointer">
            {todo.title}
          </p>
      </div>
      <div className="flex items-center gap-1 text-2xl">
        <TiTickOutline className='cursor-pointer'
          onClick={() => onCompleteTask(todo.id)}
        />
        <Popup trigger={
          <TiEdit
            // onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='cursor-pointer'
          />
        } modal nested>
          <AddTask todo={todo} isEdit={true} selectedUser={selectedUser}/>
        </Popup>
        <RiCloseCircleLine
          onClick={() => onDeleteTask(todo.id)}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default Todo;
