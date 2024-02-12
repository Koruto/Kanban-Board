import TaskItem from './TaskItem';

export default interface ColumnList {
  [key: string]: {
    title: string;
    items: TaskItem[];
  };
}
