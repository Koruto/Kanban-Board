import { useEffect, useState } from 'react';
import SelectWithOptions from './SelectWithOptions';
import fetchColumnList from '../../api/fetchColumnList';
import postDataToBackend from '../../api/postIssue';
import { useContext } from 'react';
import { ColumnContext } from '../../ColumnContext';
import { fetchColumns } from '../../api/fetchColumns';
import getUsersList from '../../api/getUserList';

interface ItemFormProps {
  onClose: () => void;
}

interface User {
  username: string;
  name: string;
  user_id: string;
}

async function getColumnList() {
  const dataL = await fetchColumnList();
  const columnList = dataL.map((item: { id: number; column_name: string }) => {
    return item.column_name;
  });

  return columnList;
}

const ItemForm: React.FC<ItemFormProps> = ({ onClose }) => {
  const { columns, setColumns } = useContext(ColumnContext);

  const [selectedValues, setSelectedValues] = useState({
    status: '',
    assignee: 'Unassigned',
  });
  const [Title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [statusOptions, setStatusOptions] = useState(['']);

  const [userOptions, setUserOptions] = useState(['Unassigned']);

  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setStatusOptions(await getColumnList());

        const data = await getUsersList();
        setUserList(data);
        const usernames = data.map(
          (user: { username: string; name: string; user_id: string }) =>
            user.username
        );
        setUserOptions(['Unassigned', ...usernames]);
      } catch (error) {
        console.error('Error fetching column list:', error);
      }
    }
    fetchData();
  }, []);

  const handleSelect = (name: string, value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (Title == '') {
      alert('Title cannot be empty!');
      return;
    }

    if (selectedValues['status'] == '') {
      alert('Status cannot be empty!');
      return;
    }

    const userId =
      selectedValues['assignee'] == 'Unassigned'
        ? ''
        : userList.find((user) => user.username === selectedValues['assignee'])
            ?.user_id;

    const userName =
      selectedValues['assignee'] == 'Unassigned'
        ? 'Unassigned'
        : userList.find((user) => user.username === selectedValues['assignee'])
            ?.username;

    const postData = {
      task: Title,
      assignee: selectedValues['assignee'],
      status: selectedValues['status'],
      user_id: userId,
      username: userName,
      description: description,
    };

    const resulte = await postDataToBackend(
      'http://localhost:3000/add/issue',
      postData
    );

    const updatedData = await fetchColumns();
    setColumns(updatedData);

    setTitle('');
    setSelectedValues({ status: '', assignee: 'Unassigned' });
    setDescription('');

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="font-bold mb-2">Status</h2>
        <SelectWithOptions
          title="Status"
          name="status"
          options={statusOptions}
          onSelect={handleSelect}
        />
      </div>

      <h2>Title</h2>

      <input
        type="text"
        name="Title"
        id="Title"
        value={Title}
        className="border-2"
        onChange={(e) => setTitle(e.target.value)}
      />

      <h2>Description</h2>
      <textarea
        value={description}
        className="border-2"
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        cols={50}
      />

      <div>
        <h2 className="font-bold mb-2">Assignee</h2>
        <SelectWithOptions
          title="Unassigned"
          name="assignee"
          options={userOptions}
          onSelect={handleSelect}
        />
      </div>
      <div className="mt-10 flex justify-around">
        <button
          className="bg-red-100 hover:bg-red-500 px-12 rounded py-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-100 hover:bg-green-500 px-12 rounded py-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
