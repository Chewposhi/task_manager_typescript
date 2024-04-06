import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddTask from './AddTask';

interface AddButtonProps {
  selectedUser: number;
}

const AddButton: React.FC<AddButtonProps> = ({ selectedUser}) => {

  return (
    <div className='flex flex-col gap-10 my-10 items-center mx-auto max-w-sm'>
      {/* popup form */}
      <div>
        <Popup trigger={
          <div className="relative bg-white bg-opacity-90 rounded-xl mt-4 hover:cursor-pointer">
            <img src="./additem.png" alt="Add task" className="w-16 h-16 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black bg-opacity-75 hover:opacity-100">
              <p className="text-white text-lg text-center">Add task</p>
            </div>
          </div>
        }
        position="bottom center"
        modal>
          <AddTask todo={null} isEdit={false} selectedUser={selectedUser}/>
        </Popup>
      </div>
    </div>
  );
}

export default AddButton;
