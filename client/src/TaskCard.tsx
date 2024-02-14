import { Draggable } from '@hello-pangea/dnd';
import TaskItem from './types/TaskItem';
import deleteRow from './api/deleteIssue';
import { ColumnContext } from './ColumnContext';
import { useContext } from 'react';
import ColumnList from './types/ColumnList';
import { fetchColumns } from './api/fetchColumns';
import { MdDelete } from 'react-icons/md';

interface TaskCardProps {
  item: TaskItem;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index }) => {
  const { setColumns } = useContext(ColumnContext);

  async function updateData(
    setColumns: React.Dispatch<React.SetStateAction<ColumnList>>
  ) {
    const updatedData = await fetchColumns();

    setColumns(updatedData);
  }

  async function handleDelete(uniqueId: string, user_id: string) {
    const user = localStorage.getItem('user');
    if (!user) return;
    const userData = JSON.parse(user);

    if (
      userData.role != 'Admin' &&
      user_id != '' &&
      user_id != userData.user_id
    ) {
      alert(
        'Cannot Delete this, only deleteable by admin or from the Assigned Person'
      );
      return;
    }

    deleteRow(uniqueId);

    updateData(setColumns);
  }

  return (
    <Draggable key={item.unique_id} draggableId={item.unique_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col justify-center items-start px-4 min-h-28 rounded-lg max-w-[311px] bg-white mt-4 w-full">
            <div className="flex justify-between w-full">
              <p className=" font-bold">{item.task}</p>

              <button
                onClick={() => handleDelete(item.unique_id, item.user_id)}
              >
                <MdDelete fill="bg-red-400" size={24} style={{ fill: 'red' }} />
              </button>
            </div>
            <span>{item.description}</span>
            <div className="flex justify-between items-center w-full text-xs font-normal text-[#7d7d7d]">
              <div>
                <span>
                  {new Date(item.due_date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>

                <div>{item.username}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
