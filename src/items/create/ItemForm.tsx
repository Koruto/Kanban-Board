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
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const [statusOptions, setStatusOptions] = useState([
    'To-do',
    'In Progress',
    'Option 3',
    'Option 4',
  ]);

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
        console.log(usernames);
      } catch (error) {
        console.error('Error fetching column list:', error);
      }
    }
    fetchData();
  }, []);

  // const options = ['To-do', 'In Progress', 'Option 3', 'Option 4'];

  const handleSelect = (name: string, value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log('Summary:', summary);
    console.log('Selected options:', selectedValues);
    console.log('Description:', description);

    // TODO Before Adding check if Summary is empty or not, if it is then break it or something

    // TODO Upon Submit clear the form data too

    console.log(columns);

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
      task: summary,
      assignee: selectedValues['assignee'],
      status: selectedValues['status'],
      user_id: userId,
      username: userName,
    };

    const resulte = await postDataToBackend(
      'http://localhost:3000/add/issue',
      postData
    );
    console.log(resulte);
    const newee = await fetchColumns();
    setColumns(newee);
    console.log(newee);

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

      <h2>Summary</h2>
      <input
        type="text"
        name="summary"
        id="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <h2>Description</h2>
      <textarea
        value={description}
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

      <button onClick={onClose}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
