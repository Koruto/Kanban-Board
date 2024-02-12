import { Draggable } from '@hello-pangea/dnd';
import BlueArrow from './elements/BlueArrow';
import CustomAvatar from './elements/CustomAvatar';
import RedArrow from './elements/RedArrow';
import YellowArrow from './elements/YellowArrow';
import TaskItem from './types/TaskItem';

interface TaskCardProps {
  item: TaskItem;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col justify-center items-start px-4 min-h-28 rounded-lg max-w-[311px] bg-white mt-4">
            <p>{item.Task}</p>
            <div className="flex justify-between items-center w-full text-xs font-normal text-[#7d7d7d]">
              <div>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>

                <span className="priority">
                  {item.Priority === 'High' ? (
                    <RedArrow />
                  ) : item.Priority === 'Medium' ? (
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
