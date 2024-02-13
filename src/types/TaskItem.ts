export default interface TaskItem {
  id: string;
  task: string;
  assignee: string;
  status: string;
  priority: string;
  due_date: string;
  unique_id: string;
  order_index: number;
}
