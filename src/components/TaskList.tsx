import React from 'react';
import { styles } from '../styles';
import TaskCard from './TaskCard';
import 'reactjs-popup/dist/index.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  todos: Todo[];
  statusCount: { [key: string]: number };
  selectedUser: number;
}

const TaskList: React.FC<TaskListProps> = ({ todos, statusCount, selectedUser }) => {
  const status = ["false", "true"];
  const statusMap: {
    [key: string]: string;
  } = {
    "true": "Completed",
    "false": "Upcoming"
  };
  

  return (
    <div className="flex justify-evenly flex-wrap gap-10 w-full sm:w-auto mt-10 p-5 bg-black bg-opacity-10 rounded-lg">
      {status.map((statusValue) => (
        <div key={statusValue} className="">
          <p className={styles.sectionSubText}>
            {statusMap[statusValue] + ": " + statusCount[statusValue]}
          </p>
          <div className="flex flex-col gap-2 w-[500px] max-h-[1000px] overflow-auto">
            {todos && todos.map((todo) => (
              (statusValue === todo.completed.toString()) && todo.userId === selectedUser && <TaskCard key={todo.id} todo={todo} selectedUser={selectedUser} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
