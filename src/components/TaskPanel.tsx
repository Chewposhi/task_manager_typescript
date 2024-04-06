import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


interface TaskPanelProps {
  todos: Todo[];
  selectedUser: number;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ todos, selectedUser }) => {
  const status = ["true", "false"];
  const [statusCount, setStatusCount] = useState<{ [key: string]: number }>({
    "true": 0,
    "false": 0
  });
  const lineWidth = 60;

  useEffect(() => {
    const newStatusCount: { [key: string]: number } = {};

    status.forEach(statusItem => {
      const count = todos.filter(todo => 
        todo.completed.toString() === statusItem && todo.userId === selectedUser
      ).length;
      newStatusCount[statusItem] = count;
    });

    setStatusCount(newStatusCount);
  }, [todos, selectedUser]);

  return (
    <div className='flex justify-center gap-5 flex-wrap'>
      {/* tasks list */}
      <TaskList todos={todos} statusCount={statusCount} selectedUser={selectedUser}/>
      <PieChart
        className='w-[300px] sm:w-[700px]'
        style={{
          fontSize: '5px',
        }}
        radius={pieChartDefaultProps.radius - 6}
        lineWidth={lineWidth}
        label={({ dataEntry }) => statusCount[dataEntry.title] === 0? "" : dataEntry.title + ": " + dataEntry.value }
        labelPosition={lineWidth}
        labelStyle={{
          fill: '#fff',
          pointerEvents: 'none',
        }}
        data={[
          { title: 'Upcoming', value: statusCount['true'], color: '#063895' },
          { title: 'Completed', value: statusCount['false'], color: '#6AB802' },
        ]}
      />
    </div>
  );
};

export default TaskPanel;
