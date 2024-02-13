import { useEffect, useState } from 'react';
import SelectWithOptions from './SelectWithOptions';
import { data } from '../../database/KanbanData';
import fetchColumnList from '../../api/fetchColumnList';
import postDataToBackend from '../../api/postIssue';

interface ItemFormProps {
  onClose: () => void;
}

async function getColumnList() {
  const dataL = await fetchColumnList();
  const columnList = dataL.map((item: { id: number; column_name: string }) => {
    return item.column_name;
  });

  return columnList;
}

const ItemForm: React.FC<ItemFormProps> = ({ onClose }) => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        setStatusOptions(await getColumnList());
      } catch (error) {
        console.error('Error fetching column list:', error);
      }
    }
    fetchData();
  }, []);

  const options = ['To-do', 'In Progress', 'Option 3', 'Option 4'];

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

    const str = data[data.length - 1].id;
    const num = parseInt(str, 10);
    const result = (num + 1).toString();
    console.log(result);

    // TODO Before Adding check if Summary is empty or not, if it is then break it or something

    // TODO Upon Submit clear the form data too

    const newItem = {
      id: result,
      Task: summary,

      Assignee: selectedValues['assignee'],
      Status: selectedValues['status'],

      Priority: 'Low',
      Due_Date: '25-May-2020',
    };
    data.push(newItem);
    console.log(data);

    const postData = {
      task: summary,
      assignee: selectedValues['assignee'],
      status: selectedValues['status'],
    };

    const resulte = await postDataToBackend(
      'http://localhost:3000/add/issue',
      postData
    );
    console.log(resulte);

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
          options={options}
          onSelect={handleSelect}
        />
      </div>

      <button onClick={onClose}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
