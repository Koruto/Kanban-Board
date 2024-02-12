import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    id: '1',
    Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',

    Assignee: 'Romona',
    Status: 'To-do',
    Priority: 'Low',
    Due_Date: '25-May-2020',
  },
  {
    id: '2',
    Task: 'Fix Styling',

    Assignee: 'Romona',
    Status: 'To-do',
    Priority: 'Low',
    Due_Date: '26-May-2020',
  },
  {
    id: '3',
    Task: 'Handle Door Specs',

    Assignee: 'Romona',
    Status: 'To-do',
    Priority: 'Low',
    Due_Date: '27-May-2020',
  },
  {
    id: '4',
    Task: 'morbi',

    Assignee: 'Kai',
    Status: 'Done',
    Priority: 'High',
    Due_Date: '23-Aug-2020',
  },
  {
    id: '5',
    Task: 'proin',

    Assignee: 'Antoinette',
    Status: 'In Progress',
    Priority: 'Medium',
    Due_Date: '05-Jan-2021',
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    title: 'Done',
    items: [],
  },
};
