import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import ColumnList from './types/ColumnList';
import CreateItem from './items/create/CreateTaskItem';
import data, { fetchColumns } from './api/fetchColumns';
import addBoard from './api/addBoard';
import deleteBoard from './api/deleteBoard';
import { ColumnContext } from './ColumnContext';
import initBoard from './api/initBoard';
import { PiPlus } from 'react-icons/pi';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type DragEndHandlerProps = (
  result: DropResult,
  columns: ColumnList,
  setColumns: React.Dispatch<React.SetStateAction<ColumnList>>
) => void;

interface KanbanProps {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const onDragEnd: DragEndHandlerProps = (
  result: DropResult,
  columns,
  setColumns
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

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

    const postData = {
      uniqueId: sourceColumn.items[source.index]?.unique_id,
      destTitle: destColumn.title,
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
      } catch (error) {
        console.error('Error:', error);
      }
    }

    updateIssue();
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
};

async function updateData(
  setColumns: React.Dispatch<React.SetStateAction<ColumnList>>
) {
  const updatedData = await fetchColumns();

  setColumns(updatedData);
}

const Kanban: React.FC<KanbanProps> = ({ setLogIn }) => {
  const [boardName, setBoardName] = useState('');
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

  async function handleAddBoard() {
    if (boardName == '') return;
    await addBoard(boardName);
    setBoardName('');

    await updateData(setColumns);
  }

  async function handleDeleteBoard(columnId: string) {
    const user = localStorage.getItem('user');
    if (user) {
      const data = JSON.parse(user);
      if (data.role != 'Admin') {
        alert('Not An Admin');
        return;
      }
    }

    await deleteBoard(columnId);
    await updateData(setColumns);
  }

  function handleSignOut() {
    localStorage.removeItem('user');
    setLogIn(false);
  }

  const userDataString = localStorage.getItem('user');
  let username = '';

  if (userDataString !== null) {
    const userData = JSON.parse(userDataString);
    username = userData.username;
  }

  useEffect(() => {
    initBoard();
  }, []);

  return (
    <ColumnContext.Provider value={{ columns, setColumns }}>
      <AppBar position="static" className="mb-10">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {username}
          </Typography>
          <Button onClick={handleSignOut} color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="flex ml-10">
          <div className="m-2 flex w-full min-h-[80vh]">
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      className="min-h-[100px] flex flex-col bg-[#f7f8f9] min-w-[341px] rounded-lg p-4 mr-12 space-y-1"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <CreateItem
                        isOpen={showCreateModal}
                        onClose={closeModal}
                      />
                      <div className="flex justify-between ">
                        <div className="text-[#10957d] bg-[#10957d] bg-opacity-20 px-10 py-2 rounded-[5px] self-start capitalize">
                          {column.title}
                        </div>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteBoard(columnId)}
                        >
                          Delete
                        </button>
                      </div>
                      <button
                        className=" hover:bg-[#e9ebee] text-black-100 font-bold py-2 px-4 rounded flex items-center justify-start pl-8"
                        onClick={openModal}
                      >
                        <PiPlus />
                        <span className="ml-1">Create Issue</span>
                      </button>

                      {column.items.map((item, index) => (
                        <TaskCard
                          key={item.unique_id}
                          item={item}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
            <div>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder=" Enter board name"
              />
              <button
                className="px-4 ml-2 bg-[#e9ebee]"
                onClick={handleAddBoard}
              >
                Add New Board
              </button>
            </div>
          </div>
        </div>
      </DragDropContext>
    </ColumnContext.Provider>
  );
};

export default Kanban;
