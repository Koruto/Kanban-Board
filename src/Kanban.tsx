import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import ColumnList from './types/ColumnList';
import CreateItem from './items/create/CreateTaskItem';
import data from './api/fetchColumns';

type DragEndHandlerProps = (
  result: DropResult,
  columns: ColumnList,
  setColumns: React.Dispatch<React.SetStateAction<ColumnList>>
) => void;

const onDragEnd: DragEndHandlerProps = (
  result: DropResult,
  columns,
  setColumns
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    console.log(source, destination);
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    console.log(sourceColumn, destColumn, source, destination, columns);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    console.log(
      source.index,
      source.droppableId,
      destination.index,
      destination.droppableId
    );
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }

  const postData = {
    sourceId: source.index,
    sourceDropId: source.droppableId,
    destId: destination.index,
    destDropId: destination.droppableId,
  };

  async function updateIssue() {
    try {
      const response = await fetch('http://localhost:3000/updateIssue', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      console.log(data); // Output: Rows updated: [number of rows updated]
    } catch (error) {
      console.error('Error:', error);
    }
  }

  updateIssue();
};

const Kanban = () => {
  const [columns, setColumns] = useState<ColumnList>(data);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const openModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    setColumns(data);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="flex">
        <div className="m-2 flex w-full min-h-[80vh]">
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    className="min-h-[100px] flex flex-col bg-[#f3f3f3] min-w-[341px] rounded-lg p-4 mr-12"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={openModal}
                    >
                      Add Issue
                    </button>
                    <CreateItem isOpen={showCreateModal} onClose={closeModal} />
                    <div className="text-[#10957d] bg-[#10957d] bg-opacity-20 px-10 py-2 rounded-[5px] self-start">
                      {column.title}
                    </div>
                    {column.items.map((item) => (
                      <TaskCard
                        key={item.unique_id}
                        item={item}
                        index={item.order_index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Kanban;
