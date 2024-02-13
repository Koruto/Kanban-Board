import { Draggable } from '@hello-pangea/dnd';
import BlueArrow from './elements/BlueArrow';
import CustomAvatar from './elements/CustomAvatar';
import RedArrow from './elements/RedArrow';
import YellowArrow from './elements/YellowArrow';
import TaskItem from './types/TaskItem';
import deleteRow from './api/deleteIssue';
import ItemForm from './items/create/ItemForm';

interface TaskCardProps {
  item: TaskItem;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index }) => {
  function handleDelete(uniqueId: string) {
    console.log(uniqueId);

    deleteRow(uniqueId);
  }

  function handleEdit(uniqueId: string) {
    console.log(uniqueId);
  }

  return (
    <Draggable key={item.unique_id} draggableId={item.unique_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col justify-center items-start px-4 min-h-28 rounded-lg max-w-[311px] bg-white mt-4">
            <p>{item.task}</p>
            <button
              onClick={() => handleDelete(item.unique_id)}
              className="bg-red-100"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(item.unique_id)}
              className="bg-blue-100"
            >
              Edit
            </button>
            <div className="flex justify-between items-center w-full text-xs font-normal text-[#7d7d7d]">
              <div>
                <span>
                  {new Date(item.due_date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>

                <span className="priority">
                  {item.priority === 'High' ? (
                    <RedArrow />
                  ) : item.priority === 'Medium' ? (
                    <YellowArrow />
                  ) : (
                    <BlueArrow />
                  )}
                </span>

                <div>
                  <CustomAvatar
                  // name={item.Assignee}
                  // isTable={false}
                  // size={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
